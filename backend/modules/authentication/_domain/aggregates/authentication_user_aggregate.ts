import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { Password } from "../value_objects/password";
import { Username } from "../../../../core/value_objects/username";
import { v4 as uuid } from "uuid";
import CreatedUserEvent from "../events/created_user_event";
import { UnimplementedError } from "../../../../core/errors/general";
import LoginAttemptEvent from "../events/login_attempt_event";
import { DomainEventEmitter } from "../../../../core/interfaces/domain_event_emitter";
import ChangedPasswordEvent from "../events/changed_password_event";

export class WrongPreviousPassword extends Failure {}

export class AuthenticationUserAggregate extends Aggregate {
  private _username: string;
  private _password: Password;

  private constructor(params: {
    id: string;
    username: string;
    password: Password;
  }) {
    super(params.id);
    this._username = params.username;
    this._password = params.password;
  }

  public static create(
    username: Username,
    password: Password
  ): AuthenticationUserAggregate {
    const id = uuid();
    const instance = new AuthenticationUserAggregate({
      id,
      username: username.value,
      password: password,
    });
    instance.addDomainEvent(new CreatedUserEvent(id));
    return instance;
  }

  public static reconstitute(params: {
    id: string;
    username: string;
    password: Password;
  }): AuthenticationUserAggregate {
    return new AuthenticationUserAggregate(params);
  }

  get id() {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get passwordHash(): string {
    return this._password.passwordHash;
  }

  get passwordSalt(): string {
    return this._password.passwordSalt;
  }

  get encryptionCycles(): number {
    return this._password.encryptionCycles;
  }

  /// Behavior
  changePassword(previousPassword: string, newPassword: Password): boolean {
    if (!this._password.passwordMatch(previousPassword)) return false;
    this._password = newPassword;
    this.addDomainEvent(new ChangedPasswordEvent(this.id));
    return true;
  }

  authenticate(password: string): boolean {
    const match = this._password.passwordMatch(password);
    this.addDomainEvent(
      new LoginAttemptEvent({
        id: this.id,
        username: this.username,
        success: match,
      })
    );
    DomainEventEmitter.markAggregateForDispatch(this);
    return match;
  }

  initializeRecoveryProcess() {}
}
