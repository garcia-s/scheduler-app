import { TransportSocketClient } from "ts-transport";
import { userEvents } from "../../../../socket-events";
import { NewAuthenticationUserDTO } from "../../application/dto/authentication/new_authentication_user_dto";
import {
  CreateAuthenticationUser,
  CreateUserUseCaseEmailAlreadyUsedFailure,
} from "../../application/use_cases/authentication/create_authentication_user";
import { AuthenticationUserRepository } from "../repositories/authentication_user_repository_impl";

export default abstract class CreateUserSocketController {
  public static async execute(
    client: TransportSocketClient,
    data: NewAuthenticationUserDTO
  ) {
    // Call the access control to check permission
    console.log(client.data)
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

    const createUser = new CreateAuthenticationUser(
      new AuthenticationUserRepository()
    );

    const createUserOrfailure = await createUser.execute(data);
    if (createUserOrfailure.err) {
      if (
        createUserOrfailure.val instanceof
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
    return client.emit(userEvents.createUser.response, { code: 200 });
  }
}
