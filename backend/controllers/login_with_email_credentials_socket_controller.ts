import { TransportSocketClient } from "ts-transport";
import { GetUserBy } from "../modules/access_control/application/use_cases/get_access_control_user";
import { AuthCredentialsDTO } from "../modules/authentication/application/dto/auth_credentials_dto";
import { AuthenticateUserWithEmailCredentials } from "../modules/authentication/application/use_cases/authenticate_user_with_email_creds";
import { userEvents } from "../socket-events";
import { UserRepository } from "../modules/access_control/application/repo_impl/user_repository_impl";
import { AuthenticationUserRepository } from "../modules/authentication/application/repo_impl/authentication_user_repository_impl";

export default abstract class LoginWithEmailCredentialsController {
  public static async execute(
    client: TransportSocketClient,
    data: AuthCredentialsDTO
  ) {
    if (client.data != null)
      return client.emit(userEvents.login.response, {
        code: 400,
        reason: "already_logged_in",
      });

    if (typeof data.username !== "string" || typeof data.password !== "string")
      return client.emit(userEvents.login.response, {
        code: 400,
        reason: "no_valid_credentials",
      });
    const useCase = new AuthenticateUserWithEmailCredentials(
      new AuthenticationUserRepository()
    );
    const authenticatedUserOrfailure = await useCase.execute(data);

    if (authenticatedUserOrfailure.err)
      return client.emit(userEvents.login.response, {
        code: 400,
        reason: "user_not_found",
      });

    const accessControl = new GetUserBy(new UserRepository());

    const accessControUserOrFailure = await accessControl.execute(
      authenticatedUserOrfailure.val.id
    );

    if (accessControUserOrFailure.err)
      return client.emit(userEvents.login.response, {
        code: 500,
        reason: "internal_server_error",
      });

    // start the session in the socket data
    client.data = authenticatedUserOrfailure.val;
    
    return client.emit(userEvents.login.response, {
      code: 200,
      data: {
        ...accessControUserOrFailure.val,
        username: authenticatedUserOrfailure.val.username,
      },
    });
  }
}
