import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../../core/domain/value_objects/password_hash";
import Failure from "../../../../core/interfaces/failure";
import { EmailAuthenticationCredentials } from "../../domain/value_objects/authentication_credentials";
import { EmailCredentialsDTO } from "../dto/email_credentials_dto";

export class EmailCredentialsMapFailure extends Failure {}

export abstract class EmailCredentialsMap {
  public static fromDTOToEntity(
    credentials: EmailCredentialsDTO
  ): Result<EmailAuthenticationCredentials, Failure> {
    const emailOrfailure = EmailAddress.create(credentials.email);
    const passwordOrFailure = PasswordHash.create(credentials.password);

    if (emailOrfailure.err || passwordOrFailure.err)
      return Err(new EmailCredentialsMapFailure());

    const emailCrendentialsOrFailure = EmailAuthenticationCredentials.create({
      email: emailOrfailure.val,
      password: passwordOrFailure.val,
    });

    if (emailCrendentialsOrFailure.err)
      return Err(new EmailCredentialsMapFailure());

    return Ok(emailCrendentialsOrFailure.val);
  }
}
