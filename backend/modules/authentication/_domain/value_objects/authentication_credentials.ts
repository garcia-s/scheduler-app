import Failure from "../../../../core/interfaces/failure";
import ValueObject from "../../../../core/interfaces/value_object";

interface IEmailAuthCredentialProps {
  email: string;
  password: string;
}

export class EmailAuthenticationCredentialsFailure extends Failure {}

export class EmailAuthenticationCredentials extends ValueObject<IEmailAuthCredentialProps> {
  get email(): string {
    return this._value.email;
  }

  get password(): string {
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
