import { Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../value_objects/password_hash";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";

import { Entity } from "../../../../../core/interfaces/entity";
import Failure from "../../../../../core/interfaces/failure";

export interface IAuthenticationUserParams {
  email: EmailAddress;
  passwordHash: PasswordHash;
}

export class AuthenticationUser extends Entity<IAuthenticationUserParams> {
  private constructor(params: IAuthenticationUserParams, id?: UniqueEntityID) {
    super(params, id);
  }
  public static create(
    params: IAuthenticationUserParams
  ): Result<AuthenticationUser, Failure> {
    return Ok(new AuthenticationUser(params));
  }

  public static reconstitute(
    params: IAuthenticationUserParams,
    id: UniqueEntityID
  ): AuthenticationUser {
    return new AuthenticationUser(params, id);
  }

  get email(): EmailAddress {
    return this.props.email;
  }

  get passwordHash(): PasswordHash {
    return this.props.passwordHash;
  }

  changeEmail(email: EmailAddress): void {
    throw UnimplementedError;
  }

  changePassword(passwordHash: PasswordHash): void {
    throw UnimplementedError;
  }
}
