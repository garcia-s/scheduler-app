import { TransportSocketClient } from "ts-transport";
import { userEvents } from "../../../../socket-events";
import { EmailCredentialsDTO } from "../../application/dto/authentication/email_credentials_dto";
import { GetAccessControlUserBy } from "../../application/use_cases/access/get_access_control_user";
import { AuthenticateUserWithEmailCredentials } from "../../application/use_cases/authentication/authenticate_user_with_email_creds";
import { AccessControlUserRepository } from "../repositories/access_control_user_repository_impl";
import { AuthenticationUserRepository } from "../repositories/authentication_user_repository_impl";

export default abstract class LoginWithEmailCredentialsController {
  public static async execute(
    client: TransportSocketClient,
    data: EmailCredentialsDTO
  ) {
    if (client.data != null)
      return client.emit(userEvents.login.response, {
        code: 400,
        reason: "already_logged_in",
      });

    if (typeof data.email !== "string" || typeof data.password !== "string")
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

    const accessControl = new GetAccessControlUserBy(
      new AccessControlUserRepository()
    );

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
    console.log(client.data)
    return client.emit(userEvents.login.response, {
      code: 200,
      data: accessControUserOrFailure.val,
    });
  }
}
