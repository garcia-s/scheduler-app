import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { PolicyEntity } from "../entities/access_control_policy";

export class AddedPolicyToGroupEvent extends IDomainEvent {
  private _id: string;
  private _policy: PolicyEntity;
  constructor(id: string, policy: PolicyEntity) {
    super();
    this._id = id;
    this._policy = policy;
  }

  get policy(): PolicyEntity {
    return this._policy;
  }
  get aggregateId(): string {
    return this._id;
  }
}
