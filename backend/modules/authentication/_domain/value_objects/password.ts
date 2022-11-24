import Failure from "../../../../core/interfaces/failure";
import ValueObject from "../../../../core/interfaces/value_object";
import { Err, Ok, Result } from "ts-results";
import crypto from "crypto";
export class PasswordValidationFailure extends Failure {}

export type IPasswordParams = {
  passwordHash: string;
  passwordSalt: string;
  encryptionCycles: number;
};

export class Password extends ValueObject<IPasswordParams> {
  private constructor(params: IPasswordParams) {
    super(params);
  }
  /**
   *
   * @param password
   * Should be at least 8 characters long with LowerCase and UpperCase
   */
  public static create(
    password: string
  ): Result<Password, PasswordValidationFailure> {
    const regex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g);
    if (!regex.test(password)) return Err(new PasswordValidationFailure());

    const passwordSalt = crypto.randomBytes(128).toString("base64");
    const encryptionCycles = crypto.randomInt(1000, 3000);
    const passwordHash = crypto
      .pbkdf2Sync(password, passwordSalt, encryptionCycles, 512, "sha512")
      .toString("base64");

    return Ok(new Password({ passwordHash, encryptionCycles, passwordSalt }));
  }

  public static reconstitute(params: IPasswordParams): Password {
    return new Password(params);
  }

  get passwordHash(): string {
    return this._value.passwordHash;
  }

  get passwordSalt(): string {
    return this._value.passwordSalt;
  }

  get encryptionCycles(): number {
    return this._value.encryptionCycles;
  }

  public passwordMatches(password: string): boolean {
    const hash = crypto
      .pbkdf2Sync(
        password,
        this.passwordSalt,
        this.encryptionCycles,
        512,
        "sha512"
      )
      .toString("base64");
    return hash === this._value.passwordHash;
  }

  equals(object: Password): boolean {
    return (
      this.encryptionCycles === object.encryptionCycles &&
      this.passwordHash == object.passwordHash &&
      this.passwordSalt === object.passwordSalt
    );
  }
}
