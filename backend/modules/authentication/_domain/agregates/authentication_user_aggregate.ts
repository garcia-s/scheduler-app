import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUser } from "../entities/authentication_user";
import CreatedUserEvent from "../events/created_user_event";
import LoginAttemptEvent from "../events/login_attempt_event";
import { Password } from "../value_objects/password";
import { Username } from "../../../../core/value_objects/username";

export class AuthenticationUserAggregate extends Aggregate<AuthenticationUser> {
  private constructor(root: AuthenticationUser) {
    super(root);
  }

  public static create(
    username: Username,
    password: Password
  ): AuthenticationUserAggregate {
    const user = AuthenticationUser.create(username, password);
    const instance = new AuthenticationUserAggregate(user);
    instance.addDomainEvent(new CreatedUserEvent(user));
    return instance;
  }

  public static recostitute(params: {
    id: string;
    username: string;
    passwordHash: string;
    passwordSalt: string;
  }): AuthenticationUserAggregate {
    return new AuthenticationUserAggregate(
      AuthenticationUser.reconstitute(params)
    );
  }


  public get username(): string {
    return this.root.username;
  }

  public get passwordHash(): string {
    return this.root.passwordHash
  }

  public get passwordSalt(): string {
    return this.root.passwordSalt;
  }

  //Behavior

  public passwordMatch(password: string):boolean {
    const result = this.root.passwordMatch(password);
    this.addDomainEvent(new LoginAttemptEvent(
      this.id,
      this.username,
      result
    ))
    this.dispatchEventForAggregate()
    return result
  }
}

export abstract class IAuthenticationUserAggregateFailure extends Failure {}

export class InvalidAuthenticationUserEntity extends IAuthenticationUserAggregateFailure {}
