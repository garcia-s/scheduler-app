import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";
import { AccessRequest } from "../value_objects/access_request";

export default class AccessRequestEvent extends IDomainEvent {
  private _userId: UUIDEntityID;
  private _request: AccessRequest;

  get userId(): UUIDEntityID {
    return this._userId;
  }

  get request(): AccessRequest {
    return this._request;
  }

  constructor(aggregateId:UUIDEntityID , request: AccessRequest) {
    super();
    this._userId = aggregateId;
    this._request = request;
  }
}
