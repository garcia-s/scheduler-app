import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { AccessRequest } from "../value_objects/access_request";

export default class AccessRequestEvent extends IDomainEvent {
  private _aggregateId: string;
  private _request: AccessRequest;

  get aggregateId(): string {
    return this._aggregateId;
  }

  get request(): AccessRequest {
    return this._request;
  }

  constructor(aggregateId: string, request: AccessRequest) {
    super();
    this._aggregateId = aggregateId;
    this._request = request;
  }
}
