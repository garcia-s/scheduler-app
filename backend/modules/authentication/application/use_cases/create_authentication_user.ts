import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../_domain/agregates/authentication_user_aggregate";
import { Password} from "../../_domain/value_objects/password";
import { Username } from "../../../../core/value_objects/username";
import { NewAuthenticationUserDTO } from "../dto/new_authentication_user_dto";
import { AuthenticationUserMap } from "../mappers/authentication_user_map";
import { IAuthenticationUserRepo, UsernameAlreadyInUseFailure } from "../repo_interfaces/authentication_user_repo";
import AuthenticationUserDTO from "../dto/authentication_user_dto";


export class CreateAuthenticationUser {
  _repository: IAuthenticationUserRepo;

  constructor(repository: IAuthenticationUserRepo) {
    this._repository = repository;
  }

  async execute(user: NewAuthenticationUserDTO):Promise<Result<AuthenticationUserDTO, Failure>> {
    const usernameOrFailure = Username.create(user.username);
    const passwordOrFailure = Password.create(user.password);

    if (usernameOrFailure.err)
      return Err(new UsernameValidationFailure());
    
    if(passwordOrFailure.err)
      return Err(new PasswordValidationFailure());

    const aggregate = AuthenticationUserAggregate.create(
      usernameOrFailure.val,
      passwordOrFailure.val,
    );

    const savedOrfailure = await this._repository.save(
      aggregate
    );

    if (savedOrfailure.err) {
      if (savedOrfailure.val instanceof UsernameAlreadyInUseFailure)
        return Err(new UsernameAlreadyUsedFailure());
        
      return Err(new DatabaseInsertionFailure());
    }
    return Ok(
      AuthenticationUserMap.fromEntityToDTO(aggregate.root)
    );
  }
}

export class UsernameValidationFailure extends Failure {}
export class PasswordValidationFailure extends Failure {}
export class UsernameAlreadyUsedFailure extends Failure {}
export class DatabaseInsertionFailure extends Failure {}
