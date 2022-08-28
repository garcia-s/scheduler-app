import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../value_objects/password_hash";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import Failure from "../../../../../core/interfaces/failure";
import {
  AuthenticationUser,
  IAuthenticationUserParams,
} from "../../entities/authentication/authentication_user";
import CreatedAuthenticationUser from "../../events/authentication/created_authenticated_user";

export class AuthenticationUserAggregate extends Aggregate<AuthenticationUser> {
  private constructor(root: AuthenticationUser) {
    super(root);
  }

  public get email(): EmailAddress {
    return this.root.email;
  }

  public get password(): PasswordHash {
    return this.root.passwordHash;
  }

  public static create(
    params: IAuthenticationUserParams
  ): Result<AuthenticationUserAggregate, IAuthenticationUserAggregateFailure> {
    // Create the entity
    const userOrFailure = AuthenticationUser.create(params);
    // verify entity integrity
    if (userOrFailure.err) return Err(InvalidAuthenticationUserEntity);
    // Create the instance for the aggregate
    const instance = new AuthenticationUserAggregate(userOrFailure.val);
    // Emit the creation domain event
    instance.addDomainEvent(new CreatedAuthenticationUser(userOrFailure.val));
    // return the instance
    return Ok(instance);
  }

  public static recostitute(
    root: AuthenticationUser
  ): AuthenticationUserAggregate {
    return new AuthenticationUserAggregate(root);
  }
}

export abstract class IAuthenticationUserAggregateFailure extends Failure {}

export class InvalidAuthenticationUserEntity extends IAuthenticationUserAggregateFailure {}
