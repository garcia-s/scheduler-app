import { IDomainEvent } from "../../../../../core/domain/events/domain_event";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AuthenticationUser } from "../../entities/authentication/authentication_user";

export default class CreatedAuthenticationUser extends IDomainEvent {
  private _user: AuthenticationUser;

  constructor(user: AuthenticationUser) {
    super();
    this._user = user;
  }

  get aggregateId(): UniqueEntityID {
    return this._user.id;
  }
}
