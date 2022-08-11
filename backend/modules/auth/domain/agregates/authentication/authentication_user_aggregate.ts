import { Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../../../core/domain/value_objects/password_hash";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import Failure from "../../../../../core/interfaces/failure";
import CreatedAuthenticatedUser from "../../events/authentication/created_authenticated_user";

export interface IAuthenticationUserAggregateParams {
  email: EmailAddress;
  password: PasswordHash;
}
export class AuthenticationUserAggregate extends Aggregate<IAuthenticationUserAggregateParams> {
  private constructor(
    params: IAuthenticationUserAggregateParams,
    id?: UniqueEntityID
  ) {
    super(params, id);
  }
  public get email(): EmailAddress {
    return this._params.email;
  }

  public get password(): PasswordHash {
    return this._params.password;
  }
  
  public static create(
    params: IAuthenticationUserAggregateParams,
    id?: UniqueEntityID
  ): Result<AuthenticationUserAggregate, Failure> {
    throw new UnimplementedError();
    const instance = new AuthenticationUserAggregate(params, id);
    if (!id) instance.addDomainEvent(new CreatedAuthenticatedUser(instance));
    return Ok(instance);
  }
}
