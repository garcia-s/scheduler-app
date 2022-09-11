import { Result } from "ts-results";
import { string } from "../../../../core/domain/value_objects/email";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import ValueObject from "../../../../core/interfaces/value_object";
import { PasswordHash } from "../../../authentication/_domain/value_objects/password";

interface IEmailAuthCredentialProps {
  email: string;
  password: PasswordHash;
}

export class EmailAuthenticationCredentialsFailure extends Failure {}

export class EmailAuthenticationCredentials extends ValueObject<IEmailAuthCredentialProps> {
  get email(): string {
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
