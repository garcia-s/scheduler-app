import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { AuthenticationUser } from "../entities/authentication_user";


export default class CreatedUserEvent extends IDomainEvent {
  private _user: AuthenticationUser;

  constructor(user: AuthenticationUser) {
    super();
    this._user = user;
  }

  get aggregateId(): string {
    return this._user.id;
  }
}
