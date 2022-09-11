import Failure from "../../../../core/interfaces/failure";
import ValueObject from "../../../../core/interfaces/value_object";
import { Err, Ok, Result } from "ts-results";

export class PasswordValidationFailure extends Failure {}


export class Password extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }
  /**
   * 
   * @param password 
   * Should be at least 8 characters long with LowerCase and UpperCase
   */  
  public static create(
    password: string
  ): Result<Password, Failure> {
    const regex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g);
    if(!regex.test(password)) return Err(new PasswordValidationFailure());
    return Ok(new Password(password));
  }

  get value(): string  {
    return this._value;
  }
}
