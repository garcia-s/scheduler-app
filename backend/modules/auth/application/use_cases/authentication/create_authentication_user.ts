import { Err, Ok } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../domain/value_objects/password_hash";
import Failure from "../../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../../domain/agregates/authentication/authentication_user_aggregate";
import { NewAuthenticationUserDTO } from "../../dto/authentication/new_authentication_user_dto";
import { AuthenticationUserMap } from "../../mappers/authentication/authentication_user_map";
import {

  AuthRepoEmailAlreadyInUseFailure,
  IAuthenticationUserRepo,
} from "../../repositories/authentication/authentication_user_repo";

export class CreateAuthenticationUser {
  _repository: IAuthenticationUserRepo;

  constructor(repository: IAuthenticationUserRepo) {
    this._repository = repository;
  }

  async execute(user: NewAuthenticationUserDTO) {
    const emailOrFailure = EmailAddress.create(user.email);
    const passwordOrFailure = PasswordHash.create(user.password);

    if (emailOrFailure.err || passwordOrFailure.err)
      return Err(CreateUserInputValidationFailure);

    const userAggregateOrFailure = AuthenticationUserAggregate.create({
      email: emailOrFailure.val,
      passwordHash: passwordOrFailure.val,
    });

    if (userAggregateOrFailure.err)
      return Err(CreateUserInputValidationFailure);

    const savedOrfailure = await this._repository.save(
      userAggregateOrFailure.val
    );

    if (savedOrfailure.err) {
      if (savedOrfailure.val instanceof AuthRepoEmailAlreadyInUseFailure)
        return Err(new CreateUserUseCaseEmailAlreadyUsedFailure());
        
      return Err(new CreateUserDatabaseInsertionFailure());
    }
    return Ok(
      AuthenticationUserMap.fromEntityToDTO(userAggregateOrFailure.val.root)
    );
  }
}

export abstract class ICreateUserUseCaseFailure extends Failure {}

export class CreateUserInputValidationFailure extends ICreateUserUseCaseFailure {}
export class CreateUserUseCaseEmailAlreadyUsedFailure extends ICreateUserUseCaseFailure {}
export class CreateUserDatabaseInsertionFailure extends Failure {}
