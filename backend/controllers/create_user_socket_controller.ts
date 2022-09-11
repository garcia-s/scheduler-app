import { TransportSocketClient } from "ts-transport";
import { UserRepository } from "../modules/access_control/application/repo_impl/access_control_user_repository_impl";
import { CreateUser } from "../modules/access_control/application/use_cases/create_access_control_user";
import { NewAuthenticationUserDTO } from "../modules/authentication/application/dto/new_authentication_user_dto";
import { AuthenticationUserRepository } from "../modules/authentication/application/repo_impl/authentication_user_repository_impl";
import {
  CreateAuthenticationUser,
  PasswordValidationFailure,
  UsernameValidationFailure,
  UsernameAlreadyUsedFailure,
} from "../modules/authentication/application/use_cases/create_authentication_user";
import { userEvents } from "../socket-events";

export default abstract class SocketController {
  public static async execute(
    client: TransportSocketClient,
    data: NewAuthenticationUserDTO
  ) {
    // Call the access control to check permission
    if (typeof data.username !== "string")
      return client.emit(userEvents.createUser.response, {
        code: 400,
        reason: "no_email_parameter_sent",
      });
    if (typeof data.password !== "string")
      return client.emit(userEvents.createUser.response, {
        code: 400,
        reason: "no_password_parameter_sent",
      });
    const createAuthenticationUser = new CreateAuthenticationUser(
      new AuthenticationUserRepository()
    );
    const createAccessUser = new CreateUser(new UserRepository());

    const createAuthUserOrfailure = await createAuthenticationUser.execute(
      data
    );

    if (createAuthUserOrfailure.err) {
      if (createAuthUserOrfailure.val instanceof UsernameAlreadyUsedFailure)
        return client.emit(userEvents.createUser.response, {
          code: 400,
          reason: "email_already_in_use",
        });

      if (createAuthUserOrfailure.val instanceof UsernameValidationFailure)
        return client.emit(userEvents.createUser.response, {
          code: 400,
          reason: "username_validation_failed",
        });

      if (createAuthUserOrfailure.val instanceof PasswordValidationFailure)
        return client.emit(userEvents.createUser.response, {
          code: 400,
          reason: "password_validation_failed",
        });

      return client.emit(userEvents.createUser.response, {
        code: 500,
        reason: "database_insertion_error",
      });
    }

    const createAccessUserOrFailure = await createAccessUser.execute({
      id: createAuthUserOrfailure.val.id,
      username: data.username,
      groups: ["schedule_db"],
    });

    if (createAccessUserOrFailure.err)
      return client.emit(userEvents.createUser.response, {
        code: 500,
        reason: "unespected_server_error",
      });

    return client.emit(userEvents.createUser.response, {
      code: 200,
      data: createAccessUserOrFailure.val,
    });
  }
}
