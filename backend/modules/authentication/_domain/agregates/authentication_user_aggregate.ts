import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { AuthenticationUser } from "../entities/authentication_user";
import CreatedUserEvent from "../events/created_user_event";

export class AuthenticationUserAggregate extends Aggregate<AuthenticationUser> {
  private constructor(root: AuthenticationUser) {
    super(root);
  }

  public get username(): string {
    return this.root.username;
  }

  public static create(
    username: string,
    password: string
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
}

export abstract class IAuthenticationUserAggregateFailure extends Failure {}

export class InvalidAuthenticationUserEntity extends IAuthenticationUserAggregateFailure {}
