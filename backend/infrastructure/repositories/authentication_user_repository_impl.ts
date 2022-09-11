import { Err, Ok, Result } from "ts-results";
import { DomainEventEmitter } from "../../core/interfaces/domain_event_emitter";
import UniqueEntityID from "../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../core/errors/general";
import { AuthenticationUserMap } from "../../modules/authentication/application/mappers/authentication_user_map";
import UserModel from "../../modules/authentication/application/models/user_model";
import { AuthRepoDatabaseWriteFailure, AuthRepostringAlreadyInUseFailure, AuthRepoUserNotFound, IAuthenticationUserRepo, IAuthenticationUserRepoFailure } from "../../modules/authentication/application/repositories/authentication_user_repo";
import { AuthenticationUserAggregate } from "../../modules/authentication/_domain/agregates/authentication_user_aggregate";

export class AuthenticationUserRepository implements IAuthenticationUserRepo {
  async save(
    user: AuthenticationUserAggregate
  ): Promise<Result<void, IAuthenticationUserRepoFailure>> {
    try {
      const exists = await this.getUserBystring(user.email.value);
      if (exists.ok) return Err(new AuthRepostringAlreadyInUseFailure());
      const newUser = AuthenticationUserMap.fromAggregateToModel(user);
      await newUser.save();
      DomainEventEmitter.dispatchEventsForAggregate(user.id);
      return Ok(undefined);
    } catch (e) {
      return Err(new AuthRepoDatabaseWriteFailure());
    }
  }

  async getUserBystring(
    email: string
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    const user = await UserModel.findOneBy({ email: email });
    if (user === null) return Err(new AuthRepoUserNotFound());
    const userAggregate = AuthenticationUserMap.fromModelToAggregate(user);
    return Ok(userAggregate);
  }

  getUserById(
    id: UniqueEntityID
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    throw new UnimplementedError();
  }
}
