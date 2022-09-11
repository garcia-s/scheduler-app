import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { EmailAuthenticationCredentials } from "../../_domain/value_objects/authentication_credentials";
import { AuthCredentialsDTO } from "../dto/auth_credentials_dto";

export class EmailCredentialsMapFailure extends Failure {}

export abstract class EmailCredentialsMap {
  
  public static fromDTOToValueObject(
    credentials: AuthCredentialsDTO
  ): Result<EmailAuthenticationCredentials, Failure> {
    
    const emailCredentials = new EmailAuthenticationCredentials({
      email:credentials.username,
      password: credentials.password,
    });

    return Ok(emailCredentials);
  }
}
