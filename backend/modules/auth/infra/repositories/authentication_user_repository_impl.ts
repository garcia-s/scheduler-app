import { Err, Ok, Result } from "ts-results";
import { DomainEventEmitter } from "../../../../core/domain/events/domain_event_emitter";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUserAggregate } from "../../domain/agregates/authentication/authentication_user_aggregate";

import {
  AuthRepoDatabaseWriteFailure,
  AuthRepoEmailAlreadyInUseFailure,
  AuthRepoUserNotFound,
  IAuthenticationUserRepo,
  IAuthenticationUserRepoFailure,
} from "../../application/repositories/authentication/authentication_user_repo";
import UserModel from "../../application/models/user_model";
import { EmptyValue } from "../../../../core/types";
import { EmailAuthenticationCredentials } from "../../domain/value_objects/authentication_credentials";

export class AuthenticationUserRepository implements IAuthenticationUserRepo {
  async save(
    user: AuthenticationUserAggregate
  ): Promise<Result<EmptyValue, IAuthenticationUserRepoFailure>> {
    try {
      const exists = await UserModel.findOne({
        where: { email: user.email.value },
      });
      if (exists) return Err(new AuthRepoEmailAlreadyInUseFailure());

      const newUser = UserModel.build({
        id: user.id.value,
        email: user.email.value,
        password: user.password.value,
      });

      await newUser.save();
      DomainEventEmitter.dispatchEventsForAggregate(user.id);
      return Ok(EmptyValue);
    } catch (e) {
      return Err(new AuthRepoDatabaseWriteFailure());
    }
  }

  async getUserByEmailCredentials(
    credentials: EmailAuthenticationCredentials
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    const userOrNull =await UserModel.findOne({where: {email: credentials.email.value}});
    if(!userOrNull) return Err(new AuthRepoUserNotFound());
  }

  getUserById(
    id: UniqueEntityID
  ): Promise<
    Result<AuthenticationUserAggregate, IAuthenticationUserRepoFailure>
  > {
    throw new UnimplementedError();
  }
}
