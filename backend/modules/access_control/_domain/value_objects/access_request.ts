import { request } from "express";
import { UnimplementedError } from "../../../../core/errors/general";
import ValueObject from "../../../../core/interfaces/value_object";
import { AccessRequestAttribute } from "./request_attribute";

export type AccessRequestParams = {
    action: string,
    attributes: AccessRequestAttribute[];
}

export class AccessRequest extends ValueObject<AccessRequestParams>{
   

    private constructor(params: AccessRequestParams) {
        super(params)
    }
    
    public static create(params: AccessRequestParams): AccessRequest {
        return new AccessRequest(params);
    }

    get action(): string {
        return this._value.action
    }

    get attributes(): AccessRequestAttribute[] {
        return this._value.attributes;
    }

    
    equals(object: ValueObject<AccessRequestParams>): boolean {
        throw new UnimplementedError();
    }    
}
