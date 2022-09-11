import { createHash } from "crypto";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import crypto from "crypto";
import ValueObject from "../../../../core/interfaces/value_object";
import { passwordSalt } from "../../../../conf";
import { Err, Ok, Result } from "ts-results";

export abstract class IPasswordHashFailure extends Failure {}
export class PasswordValidationFailure extends IPasswordHashFailure {}
export class PasswordEncryptionFailure extends IPasswordHashFailure {}

export class PasswordHash extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  
  public static create(
    value: string
  ): Result<PasswordHash, IPasswordHashFailure> {
    try {
      const hash = crypto.scryptSync(value, passwordSalt, 256).toString("hex");

      return Ok(new PasswordHash(hash));
    } catch (e) {
      return Err(new PasswordEncryptionFailure());
    }
  }

  get value(): string  {
    return this._value;
  }
  
  public static reconstitute(value: string): PasswordHash {
    return new PasswordHash(value);
  }

  equals(hash: PasswordHash): boolean {
    return this.value === hash.value;
  }
}
