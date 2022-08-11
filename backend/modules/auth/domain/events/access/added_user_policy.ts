import { IDomainEvent } from "../../../../../core/domain/events/domain_event";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessPolicy } from "../../entities/access/access_policy";


export class AddedUserPolicy extends IDomainEvent {
  private _id: UniqueEntityID;
  private _policy: AccessPolicy;

  constructor(id: UniqueEntityID, policy: AccessPolicy) {
    super();
    this._id = id;
    this._policy = policy;
  }

  get aggregateId(): UniqueEntityID {
    return this._id;
  }

  get policy(): AccessPolicy {
    return this._policy;
  }
}
