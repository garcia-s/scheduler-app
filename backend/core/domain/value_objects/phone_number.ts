import { Err, Result } from "ts-results";
import { UnimplementedError } from "../../errors/general";
import Failure from "../../interfaces/failure";
import ValueObject from "../../interfaces/value_object";

export class PhoneValidationFailure extends Failure {}

export class PhoneNumber extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(
    value: string
  ): Result<PhoneNumber, PhoneValidationFailure> {
    return Err(new PhoneValidationFailure());
  }

  equals(): boolean {
    throw new UnimplementedError();
  }
}
