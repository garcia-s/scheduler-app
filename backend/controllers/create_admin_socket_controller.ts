import { TransportSocketClient } from "ts-transport";
import { UserRepository } from "../modules/access_control/application/repo_impl/user_repository_impl";
import { CreateUser } from "../modules/access_control/application/use_cases/create_user";
import { NewAuthenticationUserDTO } from "../modules/authentication/application/dto/new_authentication_user_dto";
import { PGAuthenticationUserRepository } from "../modules/authentication/application/repo_impl/authentication_user_repository_impl";
import {
  CreateAuthenticationUser,
  UsernameValidationFailure,
  DatabaseInsertionFailure,
} from "../modules/authentication/application/use_cases/create_authentication_user";
import { userEvents } from "../socket-events";

export default abstract class SocketController {
  public static async execute(
    client: TransportSocketClient,
    data: NewAuthenticationUserDTO
  ) {
    // Call the access control to check permission

    const createAuthenticationUser = new CreateAuthenticationUser(
      new PGAuthenticationUserRepository()
    );
    const createAccessUser = new CreateUser(new UserRepository());

    const createAuthUserOrfailure = await createAuthenticationUser.execute(
      data
    );
    
    if (createAuthUserOrfailure.err) {
      if (createAuthUserOrfailure.val instanceof DatabaseInsertionFailure)
        return client.emit(userEvents.createUser.response, {
          code: 500,
          reason: "database_insertion_error",
        });

      return client.emit(userEvents.createUser.response, {
        code: 400,
        reason:
          createAuthUserOrfailure.val instanceof UsernameValidationFailure
            ? "username_validation_failed"
            : "password_validation_failed",
      });
    }

    const createAccessUserOrFailure = await createAccessUser.execute({
      id: createAuthUserOrfailure.val.id,
      username: data.username,
      groups: ["superuser"],
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
