
import { Result } from "ts-results";
import { UnimplementedError } from "../../errors/general";
import Failure from "../../interfaces/failure";
import ValueObject from "../../interfaces/value_object";

export class FullNameValidationFailure extends Failure {}

export class FullName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<FullName, Failure> {
    throw new UnimplementedError();
  }

  public equals(): boolean {
    throw new UnimplementedError();
  }
}
