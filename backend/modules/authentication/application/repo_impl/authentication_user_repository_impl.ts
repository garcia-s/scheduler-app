import { Err, Ok, Result } from "ts-results";
import { DomainEventEmitter } from "../../../../core/interfaces/domain_event_emitter";
import { UnimplementedError } from "../../../../core/errors/general";
import { AuthenticationUserMap } from "../mappers/authentication_user_map";
import UserModel from "../models/user_model";

import { AuthenticationUserAggregate } from "../../_domain/aggregates/authentication_user_aggregate";
import {
  DatabaseWriteFailure,
  IAuthenticationUserRepo,
  IAuthenticationUserRepoFailure,
  UsernameAlreadyInUseFailure,
  UserNotFound,
} from "../repo_interfaces/authentication_user_repo";

export class PGAuthenticationUserRepository implements IAuthenticationUserRepo {
  async save(
    user: AuthenticationUserAggregate
  ): Promise<Result<void, IAuthenticationUserRepoFailure>> {
    try {
      const exists = await this.getUserByUsername(user.username.value);
      if (exists.ok) return Err(new UsernameAlreadyInUseFailure());
      const newUser = AuthenticationUserMap.fromAggregateToModel(user);
      await newUser.save();
      DomainEventEmitter.dispatchEventsForAggregate(user.id);
      return Ok(undefined);
    } catch (e) {
      console.log(e);
      return Err(new DatabaseWriteFailure());
    }
  }

  async getUserByUsername(
    username: string
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    const user = await UserModel.findOneBy({ username: username });
    if (user === null) return Err(new UserNotFound());
    const userAggregate = AuthenticationUserMap.fromModelToAggregate(user);
    return Ok(userAggregate);
  }

  getUserById(
    id: string
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    throw new UnimplementedError();
  }
}
