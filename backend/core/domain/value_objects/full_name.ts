import { Err, Ok, Result } from "ts-results";
import Failure from "../../interfaces/failure";
import ValueObject from "../../interfaces/value_object";

export class FullNameValidationFailure extends Failure<FullName> {}

class FullName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<FullName, Failure<FullName>> {
    return Err(new FullNameValidationFailure());
  }
}
