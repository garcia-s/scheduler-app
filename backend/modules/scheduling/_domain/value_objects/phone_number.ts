import { Err, Ok, Result } from "ts-results";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";
import ValueObject from "../../../../core/interfaces/value_object";
import validator from "validator";

export class PhoneNumber extends ValueObject<string> {
  private constructor(val: string) {
    super(val);
  }

  public static create(
    val: string
  ): Result<PhoneNumber, DomainObjectValidationFailure> {
    if (validator.isNumeric(val) && val.length >= 7)
      return Ok(new PhoneNumber(val));
    return Err(new DomainObjectValidationFailure());
  }
}
