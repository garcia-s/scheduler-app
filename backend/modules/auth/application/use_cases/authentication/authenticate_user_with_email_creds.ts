import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../../core/interfaces/failure";
import { EmailCredentialsDTO } from "../../dto/authentication/email_credentials_dto";
import UserDTO from "../../dto/authentication/authentication_user_dto";
import { AuthenticationUserMap } from "../../mappers/authentication/authentication_user_map";
import { EmailCredentialsMap } from "../../mappers/authentication/email_credentials_map";
import { IAuthenticationUserRepo } from "../../repositories/authentication/authentication_user_repo";

export abstract class IAuthenticateUserWithCredentialsFailure extends Failure {}

export class AuthCredentialsValidationFailure extends IAuthenticateUserWithCredentialsFailure {}
export class AuthCredentialsUserNotFoundFailure extends IAuthenticateUserWithCredentialsFailure {}

export class AuthenticateUserWithEmailCredentials {
  _authenticationUserRepository: IAuthenticationUserRepo;

  constructor(authUserRepo: IAuthenticationUserRepo) {
    this._authenticationUserRepository = authUserRepo;
  }
  async execute(
    credentials: EmailCredentialsDTO
  ): Promise<Result<UserDTO, IAuthenticateUserWithCredentialsFailure>> {
    const credentialsOrFailure =
      EmailCredentialsMap.fromDTOToValueObject(credentials);

    if (credentialsOrFailure.err)
      return Err(new AuthCredentialsValidationFailure());

    const authenticationUserOrFailure =
      await this._authenticationUserRepository.getUserByEmail(
        credentialsOrFailure.val.email.value
      );

    if (
      authenticationUserOrFailure.err ||
      !authenticationUserOrFailure.val.password.equals(
        credentialsOrFailure.val.password
      )
    )
      return Err(new AuthCredentialsUserNotFoundFailure());

    return Ok(
      AuthenticationUserMap.fromEntityToDTO(
        authenticationUserOrFailure.val.root
      )
    );
  }
}
