import ValueObject from "../../../../core/interfaces/value_object";
import validator from "validator";
import { Err, Ok, Result } from "ts-results";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";

export class EmailAddress extends ValueObject<string> {
  private constructor(val: string) {
    super(val);
  }

  public static create(
    val: string
  ): Result<EmailAddress, DomainObjectValidationFailure> {
    if (validator.isEmail(val)) return Ok(new EmailAddress(val));
    return Err(new DomainObjectValidationFailure());
  }
}
