import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../../core/domain/value_objects/password_hash";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../domain/agregates/authentication/authentication_user_aggregate";
import { IAuthenticationUserRepo } from "../repositories/authentication/authentication_user_repo";
import UserDTO from "../dto/user_dto";
import { AuthenticationUserCreationDTO } from "../dto/authentication_user_creation_dto";
import IAccessGroupRepository from "../repositories/access/access_role_repo";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { IAccessUserRepository } from "../repositories/access/access_user_repo";
import { AccessPolicy } from "../../domain/entities/access/access_policy";
import { AccessUserAggregate } from "../../domain/agregates/access/access_user_aggregate";
import { AccessUserMap } from "../mappers/access_user_map";
import { AccessPolicyCollectionMap } from "../mappers/access_policy_collection_map";

export abstract class UserCreationFailure extends Failure {}

export class EmailValidationFailure extends UserCreationFailure {}
export class PasswordValidationFailure extends UserCreationFailure {}
export class UserAggregateInvariantsFailure extends UserCreationFailure {}
export class UserAccessAggregateInvariantsFailure extends UserCreationFailure {}
export class AuthUserPersistenceFailure extends UserCreationFailure {}
export class AccessUserPersistenceFailure extends UserCreationFailure {}

export class AuthenticationUserCretionUseCase {
  private _authenticationUserRepository: IAuthenticationUserRepo;
  private _AccessGroupRepository: IAccessGroupRepository;
  private _accessUserRepository: IAccessUserRepository;
  //   private _accessUserRepository:
  constructor(
    authUserRepo: IAuthenticationUserRepo,
    AccessGroupRepo: IAccessGroupRepository,
    accesUserRepo: IAccessUserRepository
  ) {
    this._authenticationUserRepository = authUserRepo;
    this._AccessGroupRepository = AccessGroupRepo;
    this._accessUserRepository = accesUserRepo;
  }

  async execute(
    user: AuthenticationUserCreationDTO
  ): Promise<Result<UserDTO, Failure>> {
    // creating the parameters
    const emailOrFailure = EmailAddress.create(user.email);
    const passwordOrFailure = PasswordHash.create(user.password);

    if (emailOrFailure.err) return Err(EmailValidationFailure);
    if (passwordOrFailure.err) return Err(PasswordValidationFailure);

    const authenticationUserOrFailure = AuthenticationUserAggregate.create({
      email: emailOrFailure.val,
      password: passwordOrFailure.val,
    });

    if (authenticationUserOrFailure.err)
      return Err(new UserAggregateInvariantsFailure());

    const policies: AccessPolicy[] =
      AccessPolicyCollectionMap.fromDTOsToEntities(user.policies);
    const roles = await this._AccessGroupRepository.getRoleList(
      user.roles.map((el) => new UniqueEntityID(el))
    );

    const accessUserAggregateOrFail = AccessUserAggregate.create({
      email: emailOrFailure.val,
      roles,
      policies,
    });

    if (accessUserAggregateOrFail.err)
      return Err(new UserAccessAggregateInvariantsFailure());
    const saveUserOrFail = await this._accessUserRepository.save();

    if (saveUserOrFail.err) return Err(AuthUserPersistenceFailure);

    const saveAccessOrFail = await this._authenticationUserRepository.save(
      authenticationUserOrFailure.val
    );
    if (saveAccessOrFail.err) return Err(AccessUserPersistenceFailure);
    return Ok(AccessUserMap.fromAggregateToDTO(accessUserAggregateOrFail.val));
  }
}
