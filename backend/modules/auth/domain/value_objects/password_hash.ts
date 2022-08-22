import { createHash } from "crypto";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import crypto from "crypto";
import ValueObject from "../../../../core/interfaces/value_object";
import Config from "../../conf";
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
      const hash = crypto
        .scryptSync(value, Config.passwordSalt, 256)
        .toString("hex");

      return Ok(new PasswordHash(hash));
    } catch (e) {
      return Err(new PasswordEncryptionFailure());
    }
  }

  equals(): boolean {
    throw new UnimplementedError();
  }
}
