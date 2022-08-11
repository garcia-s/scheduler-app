import { Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";

import { Entity } from "../../../../../core/interfaces/entity";
import Failure from "../../../../../core/interfaces/failure";

export interface IAuthenticationUserParams {
  email: EmailAddress;
}

export class AuthenticationUser extends Entity<IAuthenticationUserParams> {
  private constructor(params: IAuthenticationUserParams, id?: UniqueEntityID) {
    super(params, id);
  }
  public static create(
    params: IAuthenticationUserParams,
    id?: UniqueEntityID
  ): Result<AuthenticationUser, Failure> {
    return Ok(new AuthenticationUser(params, id));
  }

  changeEmail(email: EmailAddress): void {
    throw UnimplementedError;
  }
}
