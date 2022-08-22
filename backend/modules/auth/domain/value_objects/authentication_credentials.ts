import { Result } from "ts-results";
import { EmailAddress } from "../../../../core/domain/value_objects/email";
import { PasswordHash } from "./password_hash";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import ValueObject from "../../../../core/interfaces/value_object";

interface IEmailAuthCredentialProps {
  email: EmailAddress;
  password: PasswordHash;
}

export class EmailAuthenticationCredentialsFailure extends Failure {}

export class EmailAuthenticationCredentials extends ValueObject<IEmailAuthCredentialProps> {
  get email(): EmailAddress {
    return this.value.email;
  }

  get password(): PasswordHash {
    return this.value.password;
  }

  private constructor(params: IEmailAuthCredentialProps) {
    super(params);
  }

  public static create(
    params: IEmailAuthCredentialProps
  ): Result<
    EmailAuthenticationCredentials,
    EmailAuthenticationCredentialsFailure
  > {
    throw UnimplementedError;
  }

  equals(object: EmailAuthenticationCredentials): boolean {
    return (
      object.value.email === this.value.email &&
      object.value.password === this.value.password
    );
  }
}
