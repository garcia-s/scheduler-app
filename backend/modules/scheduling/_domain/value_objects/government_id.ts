import { Err, Ok, Result } from "ts-results";
import validator from "validator";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";
import ValueObject from "../../../../core/interfaces/value_object";

export class GovernmentID extends ValueObject<string> {
  private constructor(val: string) {
    super(val);
  }

  public static create(
    val: string,
  ): Result<GovernmentID, DomainObjectValidationFailure> {
    if (validator.isNumeric(val) && val.length >= 6)
      return Ok(new GovernmentID(val));
    return Err(new DomainObjectValidationFailure());
  }
}
