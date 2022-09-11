import { Err, Ok } from "ts-results";
import { string } from "../../../../core/domain/value_objects/email";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../_domain/agregates/authentication_user_aggregate";
import { PasswordHash } from "../../_domain/value_objects/password_hash";
import { NewAuthenticationUserDTO } from "../dto/new_authentication_user_dto";
import { AuthenticationUserMap } from "../mappers/authentication_user_map";
import { AuthRepoEmailAlreadyInUseFailure, IAuthenticationUserRepo } from "../repositories/authentication_user_repo";


export class CreateAuthenticationUser {
  _repository: IAuthenticationUserRepo;

  constructor(repository: IAuthenticationUserRepo) {
    this._repository = repository;
  }

  async execute(user: NewAuthenticationUserDTO) {
    const emailOrFailure = string.create(user.email);
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

export class CreateUserInputValidationFailure extends Failure {}
export class CreateUserUseCaseEmailAlreadyUsedFailure extends Failure {}
export class CreateUserDatabaseInsertionFailure extends Failure {}
