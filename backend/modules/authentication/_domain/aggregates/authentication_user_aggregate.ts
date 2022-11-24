import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { Password } from "../value_objects/password";
import { Username } from "../../../../core/value_objects/username";
import CreatedUserEvent from "../events/created_user_event";
import LoginAttemptEvent from "../events/login_attempt_event";
import { DomainEventEmitter } from "../../../../core/interfaces/domain_event_emitter";
import ChangedPasswordEvent from "../events/changed_password_event";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";
import { RecoveryToken } from "../value_objects/recovery_token";
import { PasswordRecoveryEvent } from "../events/password_recovery_event";
import { Err, Ok, Result } from "ts-results";

export class WrongPreviousPassword extends Failure {}

export abstract class IRecoveryPasswordFailure {}

export class NoRecoveryToken extends IRecoveryPasswordFailure {}
export class ExpiredRecoveryToken extends IRecoveryPasswordFailure {}
export class RecoveryTokenNotMatched extends IRecoveryPasswordFailure {}

export class AuthenticationUserAggregate extends Aggregate {
  private _username: Username;
  private _password: Password;
  private _recoveryToken?: RecoveryToken;

  private constructor(params: {
    id: UUIDEntityID;
    username: Username;
    password: Password;
    recoveryToken?: RecoveryToken;
  }) {
    super(params.id);
    this._username = params.username;
    this._password = params.password;
  }

  public static create(
    username: Username,
    password: Password
  ): AuthenticationUserAggregate {
    const id = UUIDEntityID.create();
    const instance = new AuthenticationUserAggregate({
      id,
      username: username,
      password: password,
    });
    instance.addDomainEvent(new CreatedUserEvent(id.value));
    return instance;
  }


  public static reconstitute(params: {
    id: UUIDEntityID;
    username: Username;
    password: Password;
    recoveryToken?: RecoveryToken;
  }): AuthenticationUserAggregate {
    return new AuthenticationUserAggregate(params);
  }

  get id(): UUIDEntityID {
    return this._id;
  }

  get username(): Username {
    return this._username
  }

  get password(): Password{
    return this._password;
  }
  
  get recoveryToken(): RecoveryToken | undefined {
    return this._recoveryToken;
  }

  /// Behavior
  changePassword(previousPassword: string, newPassword: Password): boolean {
    if (!this._password.passwordMatches(previousPassword)) return false;
    this._password = newPassword;
    this.addDomainEvent(new ChangedPasswordEvent(this.id.value));
    return true;
  }

  authenticate(password: string): boolean {
    const match = this._password.passwordMatches(password);
    this.addDomainEvent(
      new LoginAttemptEvent({
        id: this.id.value,
        username: this.username.value,
        success: match,
      })
    );
    DomainEventEmitter.markAggregateForDispatch(this);
    return match;
  }

  initializeRecoveryProcess(): void {
    this._recoveryToken = RecoveryToken.create();
    this.addDomainEvent(
      new PasswordRecoveryEvent(this._id, this._recoveryToken)
    );
  }

  recoverPassword(params: {
    token: string;
    newPassword: Password;
  }): Result<true, IRecoveryPasswordFailure> {
    if (this._recoveryToken == null) return Err(new NoRecoveryToken());
    if (Date.now() - this._recoveryToken?.timestamp.getTime() > 3600)
      return Err(ExpiredRecoveryToken);
    if (this._recoveryToken.token !== params.token)
      return Err(new RecoveryTokenNotMatched());
    return Ok(true);
  }
}
