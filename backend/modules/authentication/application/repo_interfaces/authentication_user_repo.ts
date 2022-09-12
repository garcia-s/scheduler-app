import { Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../_domain/aggregates/authentication_user_aggregate";


export interface IAuthenticationUserRepo {
  save(
    user: AuthenticationUserAggregate
  ): Promise<Result<void, IAuthenticationUserRepoFailure>>;

  getUserByUsername(
    email: string
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  >;

  getUserById(
    id: string
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  >;
  
}

export abstract class IAuthenticationUserRepoFailure extends Failure {}

export class DatabaseWriteFailure extends IAuthenticationUserRepoFailure {}
export class UsernameAlreadyInUseFailure extends IAuthenticationUserRepoFailure {}
export class UserNotFound extends IAuthenticationUserRepoFailure {}