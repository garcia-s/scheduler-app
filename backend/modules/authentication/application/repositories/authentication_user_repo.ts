import { Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../_domain/agregates/authentication_user_aggregate";


export interface IAuthenticationUserRepo {
  save(
    user: AuthenticationUserAggregate
  ): Promise<Result<void, IAuthenticationUserRepoFailure>>;

  getUserBystring(
    email: string
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  >;

  getUserById(
    id: UniqueEntityID
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  >;
  
}

export abstract class IAuthenticationUserRepoFailure extends Failure {}

export class AuthRepoDatabaseWriteFailure extends IAuthenticationUserRepoFailure {}
export class AuthRepostringAlreadyInUseFailure extends IAuthenticationUserRepoFailure {}
export class AuthRepoUserNotFound extends IAuthenticationUserRepoFailure {}