import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { StringEntityID } from "../../../../core/value_objects/string_entity_id";
import { PolicyEntity } from "../entities/access_control_policy";

export class AddedPolicyToGroupEvent extends IDomainEvent {
  private _id: StringEntityID;
  private _policy: PolicyEntity;
  constructor(id: StringEntityID, policy: PolicyEntity) {
    super();
    this._id = id;
    this._policy = policy;
  }

  get policy(): PolicyEntity {
    return this._policy;
  }
  get aggregateId(): StringEntityID {
    return this._id;
  }
}
