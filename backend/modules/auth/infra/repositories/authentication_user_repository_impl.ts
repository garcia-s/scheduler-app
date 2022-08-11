import { Err, Ok, Result } from "ts-results";
import { DomainEventEmitter } from "../../../../core/domain/events/domain_event_emitter";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../domain/agregates/authentication/authentication_user_aggregate";

import {
  IAuthenticationUserRepo,
  IAuthenticationUserRepoFailure,
} from "../../application/repositories/authentication/authentication_user_repo";
import UserModel from "../../application/models/user_model";

export class DatabaseUserCreationFailure extends IAuthenticationUserRepoFailure {}

export class AuthenticationUserRepository implements IAuthenticationUserRepo {
  async save(
    user: AuthenticationUserAggregate
  ): Promise<Result<null, IAuthenticationUserRepoFailure>> {
    try {
      await UserModel.build({
        id: user.id.value,
        email: user.email.value,
        password: user.password.value,
      });
      DomainEventEmitter.dispatchEventsForAggregate(user.id);
      return Ok(null);
    } catch (e) {
      return Err(new DatabaseUserCreationFailure());
    }
  }
  getUserByEmailCredentials(): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    throw new UnimplementedError();
  }

  getUserById(
    id: UniqueEntityID
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    throw new UnimplementedError();
  }
}
