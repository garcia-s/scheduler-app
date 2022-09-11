import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { AccessRequest } from "../value_objects/access_request";

export default class AccessRequestEvent extends IDomainEvent {
    private _aggregateId: UniqueEntityID;
    private _userName: string;
    private _request: AccessRequest
    
    get aggregateId(): UniqueEntityID {
        return this._aggregateId;
    }

    get userName(): string {
        return this._userName;
    }

    get request(): AccessRequest {
        return this._request;
    }

    constructor(aggregateId: UniqueEntityID, userName: string, request: AccessRequest) {
        super();
        this._aggregateId = aggregateId;
        this._userName = userName;
        this._request = request;
    }
}