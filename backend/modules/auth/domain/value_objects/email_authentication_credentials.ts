import { EmailAddress } from "../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../../core/domain/value_objects/password_hash";
import ValueObject from "../../../../core/interfaces/value_object";

export interface IEmailAuthCredentialsParams {
  email: EmailAddress;
  password: PasswordHash;
}

export class EmailAuthenticationCrendentials extends ValueObject<IEmailAuthCredentialsParams> {
  get email(): EmailAddress {
    return this.value.email;
  }

  get password(): PasswordHash {
    return this.value.password;
  }
}
