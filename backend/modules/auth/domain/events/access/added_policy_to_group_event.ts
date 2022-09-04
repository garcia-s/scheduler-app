import { IDomainEvent } from "../../../../../core/domain/events/domain_event";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessControlPolicyEntity } from "../../entities/access/access_control_policy";

export class AddedPolicyToGroupEvent extends IDomainEvent {
    private _id: UniqueEntityID
    private _policy: AccessControlPolicyEntity
    constructor(id: UniqueEntityID, policy: AccessControlPolicyEntity ) {
        super()
        this._id = id;
        this._policy = policy;
    }

    get policy(): AccessControlPolicyEntity {
        return this._policy;
    }
    get aggregateId():UniqueEntityID {
        return this._id;
    }
}
