import { request } from "express";
import ValueObject from "../../../../core/interfaces/value_object";

export type AccessRequestParams = {
    action: string,
    objectOwner: string,
    objectId: string,
    objectType: string,
}

export class AccessRequest extends ValueObject<AccessRequestParams>{
   

    private constructor(params: AccessRequestParams) {
        super(params)
    }
    
    public static create(params: AccessRequestParams) {
        return new AccessRequest(params);
    }

    get action(): string {
        return this._value.action
    }

    get objectOwner(): string {
        return this._value.objectOwner
    }

    get objectId(): string {
        return this._value.objectId
    }

    get objectType(): string {
        return this._value.objectType
    }
}
