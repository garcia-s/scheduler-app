import { IDomainEvent } from "../../../../../core/domain/events/domain_event";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AuthenticationUserAggregate } from "../../agregates/authentication/authentication_user_aggregate";

import { AuthenticationUser } from "../../entities/authentication/authentication_user";

export default class CreatedAuthenticatedUser extends IDomainEvent {
  private _user: AuthenticationUserAggregate;

  constructor(user: AuthenticationUserAggregate) {
    super();
    this._user = user;
  }

  get aggregateId(): UniqueEntityID {
    return this._user.id;
  }
}
