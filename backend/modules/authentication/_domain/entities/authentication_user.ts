import { PasswordHash } from "../value_objects/password_hash";
import { UnimplementedError } from "../../../../core/errors/general";
import crypto from "crypto";
import { Entity } from "../../../../core/interfaces/entity";
import { v4 as uuid } from "uuid";

export class AuthenticationUser extends Entity {
  private _id: string;
  private _username: string;
  private _passwordHash: string;
  private _passwordSalt: string;

  private constructor(params: {
    id: string;
    username: string;
    passwordHash: string;
    passwordSalt: string;
  }) {
    super();
    this._id = params.id;
    this._username = params.username;
    (this._passwordHash = params.passwordHash),
      (this._passwordSalt = params.passwordSalt);
  }

  public static create(username: string, password: string): AuthenticationUser {
    const id = uuid();
    const passwordSalt = crypto.randomBytes(32).toString();
    const passwordHash = AuthenticationUser.hash(password, passwordSalt);
    return new AuthenticationUser({
      id,
      username,
      passwordHash,
      passwordSalt,
    });
  }

  public static reconstitute(params: {
    id: string;
    username: string;
    passwordHash: string;
    passwordSalt: string;
  }): AuthenticationUser {
    return new AuthenticationUser(params);
  }

  private static hash(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 1000, 256, "sha512").toString();
  }


  get id() {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

 /// Behavior
  passwordMatch(password: string): boolean {
    return (
      AuthenticationUser.hash(password, this._passwordSalt) ===
      this._passwordHash
    );
  }


  changeEmail(email: string): void {
    throw UnimplementedError;
  }

  changePassword(passwordHash: PasswordHash): void {
    throw UnimplementedError;
  }
}
