import { Err, Ok, Result } from "ts-results";
import { DomainEventEmitter } from "../../../../core/domain/events/domain_event_emitter";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../core/errors/general";
import { AuthenticationUserAggregate } from "../../domain/agregates/authentication/authentication_user_aggregate";

import {
  AuthRepoDatabaseWriteFailure,
  AuthRepoEmailAlreadyInUseFailure,
  AuthRepoUserNotFound,
  IAuthenticationUserRepo,
  IAuthenticationUserRepoFailure,
} from "../../application/repositories/authentication/authentication_user_repo";
import UserModel from "../../application/models/auth/user_model";
import { EmptyValue } from "../../../../core/types";
import { AuthenticationUserMap } from "../../application/mappers/authentication/authentication_user_map";

export class AuthenticationUserRepository implements IAuthenticationUserRepo {
  async save(
    user: AuthenticationUserAggregate
  ): Promise<Result<EmptyValue, IAuthenticationUserRepoFailure>> {
    try {
      const exists = await this.getUserByEmail(user.email.value);
      if (exists.ok) return Err(new AuthRepoEmailAlreadyInUseFailure());
      const newUser = AuthenticationUserMap.fromAggregateToModel(user);
      await newUser.save();
      DomainEventEmitter.dispatchEventsForAggregate(user.id);
      return Ok(EmptyValue);
    } catch (e) {
      return Err(new AuthRepoDatabaseWriteFailure());
    }
  }

  async getUserByEmail(
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
