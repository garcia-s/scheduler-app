import { Err, Ok, Result } from "ts-results";
import { string } from "../../../../core/domain/value_objects/email";
import Failure from "../../../../core/interfaces/failure";
import { EmailAuthenticationCredentials } from "../../_domain/value_objects/authentication_credentials";
import { PasswordHash } from "../../_domain/value_objects/password_hash";
import { EmailCredentialsDTO } from "../dto/email_credentials_dto";

export class EmailCredentialsMapFailure extends Failure {}

export abstract class EmailCredentialsMap {
  
  public static fromDTOToValueObject(
    credentials: EmailCredentialsDTO
  ): Result<EmailAuthenticationCredentials, Failure> {
    const emailOrfailure = string.create(credentials.email);
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
