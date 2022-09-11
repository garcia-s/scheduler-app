import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { PolicyEntity } from "../entities/access_control_policy";

export class AddedPolicyToGroupEvent extends IDomainEvent {
    private _id: UniqueEntityID
    private _policy: PolicyEntity
    constructor(id: UniqueEntityID, policy: PolicyEntity ) {
        super()
        this._id = id;
        this._policy = policy;
    }

    get policy(): PolicyEntity {
        return this._policy;
    }
    get aggregateId():UniqueEntityID {
        return this._id;
    }
}
