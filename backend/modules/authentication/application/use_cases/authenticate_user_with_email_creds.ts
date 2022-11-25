import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import UserDTO from "../dto/authentication_user_dto";
import { AuthCredentialsDTO } from "../dto/auth_credentials_dto";
import { AuthenticationUserMap } from "../mappers/authentication_user_map";
import { EmailCredentialsMap } from "../mappers/email_credentials_map";
import { IAuthenticationUserRepo } from "../repo_interfaces/authentication_user_repo";

export abstract class IAuthenticateUserWithCredentialsFailure extends Failure {}

export class AuthCredentialsValidationFailure extends IAuthenticateUserWithCredentialsFailure {}
export class AuthCredentialsUserNotFoundFailure extends IAuthenticateUserWithCredentialsFailure {}

export class AuthenticateUserWithEmailCredentials {
  _authenticationUserRepository: IAuthenticationUserRepo;

  constructor(authUserRepo: IAuthenticationUserRepo) {
    this._authenticationUserRepository = authUserRepo;
  }
  async execute(
    credentials: AuthCredentialsDTO
  ): Promise<Result<UserDTO, IAuthenticateUserWithCredentialsFailure>> {
    const credentialsOrFailure =
      EmailCredentialsMap.fromDTOToValueObject(credentials);

    if (credentialsOrFailure.err)
      return Err(new AuthCredentialsValidationFailure());

    const authenticationUserOrFailure =
      await this._authenticationUserRepository.getUserByUsername(
        credentialsOrFailure.val.email
      );

    if (
      authenticationUserOrFailure.err ||
      !authenticationUserOrFailure.val.authenticate(
        credentialsOrFailure.val.password
      )
    )
      return Err(new AuthCredentialsUserNotFoundFailure());

    return Ok(
      AuthenticationUserMap.fromAggregateToDTO(
        authenticationUserOrFailure.val
      )
    );
  }
}
