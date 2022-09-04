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
    return this._value.email;
  }

  get password(): PasswordHash {
    return this._value.password;
  }

  constructor(params: IEmailAuthCredentialProps) {
    super(params);
  }


  equals(object: EmailAuthenticationCredentials): boolean {
    return (
      object.email === this._value.email &&
      object.password === this._value.password
    );
  }
}
