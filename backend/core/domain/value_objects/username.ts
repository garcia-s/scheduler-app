import ValueObject from "../../interfaces/value_object";
import { Err, Ok, Result } from "ts-results";
import Failure from "../../interfaces/failure";

export class UsernameValidationFaiulure extends Failure<Username> {}

export class Username extends ValueObject<String> {
  private constructor(username: String) {
    super(username);
  }

  public static alphaNumericStartAndEnding(
    username: string
  ): Result<Username, Failure<Username>> {
    const regex = RegExp(
      /^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    );
    if (typeof username !== "string" || regex.test(username))
      return Err(new UsernameValidationFaiulure());
    return Ok(new Username(username.toLowerCase()));
  }
}
