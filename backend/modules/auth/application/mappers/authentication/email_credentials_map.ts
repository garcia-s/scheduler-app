import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../domain/value_objects/password_hash";
import Failure from "../../../../../core/interfaces/failure";
import { EmailAuthenticationCredentials } from "../../../domain/value_objects/authentication_credentials";
import { EmailCredentialsDTO } from "../../dto/authentication/email_credentials_dto";

export class EmailCredentialsMapFailure extends Failure {}

export abstract class EmailCredentialsMap {
  
  public static fromDTOToValueObject(
    credentials: EmailCredentialsDTO
  ): Result<EmailAuthenticationCredentials, Failure> {
    const emailOrfailure = EmailAddress.create(credentials.email);
    const passwordOrFailure = PasswordHash.create(credentials.password);

    if (emailOrfailure.err || passwordOrFailure.err)
      return Err(new EmailCredentialsMapFailure());

    const emailCredentials = new EmailAuthenticationCredentials({
      email: emailOrfailure.val,
      password: passwordOrFailure.val,
    });

    return Ok(emailCredentials);
  }
}
