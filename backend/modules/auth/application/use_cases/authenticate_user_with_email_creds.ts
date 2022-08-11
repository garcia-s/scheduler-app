import { Err, Ok, Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import { IAccessUserRepository } from "../repositories/access/access_user_repo";
import { IAuthenticationUserRepo } from "../repositories/authentication/authentication_user_repo";
import { EmailCredentialsDTO } from "../dto/email_credentials_dto";
import UserDTO from "../dto/user_dto";
import { AccessUserMap } from "../mappers/access_user_map";
import { EmailCredentialsMap } from "../mappers/email_credentials_map";

export abstract class IAuthenticateUserWithCredentialsFailure extends Failure {}

export class AuthCredentialsValidationFailure extends IAuthenticateUserWithCredentialsFailure {}
export class AuthCredentialsUserNotFoundFailure extends IAuthenticateUserWithCredentialsFailure {}
export class AuthenticateUserWithEmailCredentials {
  _authenticationUserRepository: IAuthenticationUserRepo;
  _accessUserRepository: IAccessUserRepository;

  constructor(
    authUserRepo: IAuthenticationUserRepo,
    accesUserRepo: IAccessUserRepository
  ) {
    this._authenticationUserRepository = authUserRepo;
    this._accessUserRepository = accesUserRepo;
  }
  async execute(
    credentials: EmailCredentialsDTO
  ): Promise<Result<UserDTO, IAuthenticateUserWithCredentialsFailure>> {
    const credentialsOrFailure =
      EmailCredentialsMap.fromDTOToEntity(credentials);
      
    if (credentialsOrFailure.err)
      return Err(new AuthCredentialsValidationFailure());

    const authenticationUserOrFailure =
      await this._authenticationUserRepository.getUserByEmailCredentials(
        credentialsOrFailure.val
      );

    if (authenticationUserOrFailure.err)
      return Err(new AuthCredentialsUserNotFoundFailure());

    const accessUserOrFailure =
      await this._accessUserRepository.getAccessUserById(
        authenticationUserOrFailure.val.id
      );

    if (accessUserOrFailure.err)
      return Err(new AuthCredentialsUserNotFoundFailure());

    return Ok(AccessUserMap.fromAggregateToDTO(accessUserOrFailure.val));
  }
}
