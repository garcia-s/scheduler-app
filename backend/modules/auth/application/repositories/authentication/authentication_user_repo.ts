import { Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import { EmailAuthenticationCredentials } from "../../../domain/value_objects/authentication_credentials";
import { AuthenticationUserAggregate } from "../../../domain/agregates/authentication/authentication_user_aggregate";

export interface IAuthenticationUserRepo {
  save(
    user: AuthenticationUserAggregate
  ): Promise<Result<null, IAuthenticationUserRepoFailure>>;

  getUserByEmailCredentials(
    email: EmailAuthenticationCredentials
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
