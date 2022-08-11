import { IDomainEvent } from "../../../../../core/domain/events/domain_event";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";


export class DeletedUserPolicy extends IDomainEvent {
  private _id: UniqueEntityID;
  private _policyId: UniqueEntityID;

  constructor(id: UniqueEntityID, policy: UniqueEntityID) {
    super();
    this._id = id;
    this._policyId = policy;
  }

  get aggregateId(): UniqueEntityID {
    return this._id;
  }

  get policyId(): UniqueEntityID {
    return this._policyId;
  }
}
