import { request } from "express";
import { UnimplementedError } from "../../../../core/errors/general";
import ValueObject from "../../../../core/interfaces/value_object";
import { AccessRequestAttribute } from "../../../access_control/_domain/value_objects/request_attribute";

export type AccessRequestParams = {
    action: string,
    attributes: AccessRequestAttribute[];
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

    get attributes(): AccessRequestAttribute[] {
        return this._value.attributes;
    }

    equals(object: AccessRequest): boolean {
        throw new UnimplementedError();
    }
}
