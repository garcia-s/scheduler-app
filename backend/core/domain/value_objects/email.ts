import { Err, Ok, Result } from "ts-results";
import { UnimplementedError } from "../../errors/general";
import Failure from "../../interfaces/failure";
import ValueObject from "../../interfaces/value_object";

export class EmailValidationFailure extends Failure {}

export class EmailAddress extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(
    email: string
  ): Result<EmailAddress, EmailValidationFailure> {
    const regex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!regex.test(email)) return Err(new EmailValidationFailure());
    return Ok(new EmailAddress(email.toLowerCase()));
  }

  equals(): boolean {
    throw new UnimplementedError();
  }
}
