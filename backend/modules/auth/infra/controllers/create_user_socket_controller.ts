import { TransportSocketClient } from "ts-transport";
import { userEvents } from "../../../../socket-events";
import { NewAuthenticationUserDTO } from "../../application/dto/authentication/new_authentication_user_dto";
import { CreateAccessControlUser } from "../../application/use_cases/access/create_access_control_user";
import {
  CreateAuthenticationUser,
  CreateUserUseCaseEmailAlreadyUsedFailure,
} from "../../application/use_cases/authentication/create_authentication_user";
import { AccessControlUserRepository } from "../repositories/access_control_user_repository_impl";
import { AuthenticationUserRepository } from "../repositories/authentication_user_repository_impl";

export default abstract class CreateUserSocketController {
  public static async execute(
    client: TransportSocketClient,
    data: NewAuthenticationUserDTO
  ) {
    // Call the access control to check permission
    if (typeof data.email !== "string")
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
    const createAccessUser = new CreateAccessControlUser(
      new AccessControlUserRepository()
    );

    const createAuthUserOrfailure = await createAuthenticationUser.execute(
      data
    );

    if (createAuthUserOrfailure.err) {
      if (
        createAuthUserOrfailure.val instanceof
        CreateUserUseCaseEmailAlreadyUsedFailure
      )
        return client.emit(userEvents.createUser.response, {
          code: 400,
          reason: "email_already_in_use",
        });

      return client.emit(userEvents.createUser.response, {
        code: 500,
        reason: "database_insertion_error",
      });
    }
    
    const createAccessUserOrFailure = await createAccessUser.execute({
      id: createAuthUserOrfailure.val.id,
      username: data.email,
      accessControlGroupNames: [],
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
