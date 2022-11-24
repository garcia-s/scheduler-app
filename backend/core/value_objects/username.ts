import { Err, Ok, Result } from "ts-results";
import Failure from "../interfaces/failure";
import ValueObject from "../interfaces/value_object";

export class UsernameValidationFailure extends Failure {}


export class Username extends ValueObject<string> {
    private constructor(value: string) {
      super(value);
    }
  
    /**
     * 
     * @param username 
     * can have any alphanumeric characters and any of this '._-/@' characters
     * 
     */
    public static create(
      username: string
    ): Result<Username, Failure> {
      const regex = new RegExp(/^[A-Za-z0-9]+([A-Za-z0-9._/\-@]){4,}/g);
      if(!regex.test(username)) return Err(new UsernameValidationFailure());
      return Ok(new Username(username));
    }

    public static reconstitute(username: string) {
      return new Username(username)
    }
  
    get value(): string  {
      return this._value;
    }

    equals(object: Username): boolean {
      return this.value == object.value;
    }
  
  }
  