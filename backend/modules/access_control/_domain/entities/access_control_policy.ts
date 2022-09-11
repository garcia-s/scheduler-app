import { Err, Ok, Result } from "ts-results";
import { Entity } from "../../../../core/interfaces/entity";
import Failure from "../../../../core/interfaces/failure";
import { AccessRequest } from "../value_objects/access_request";
import { v4 as uuid } from "uuid";

// Policies should have:
//
// Subject: Person who we are refering to
//
// Act: the action to be executed to the object => CRUD.
//
// Object: The resource being accessed by the subject.
// And this should contain the characterstics needed to determine the resource identity.

export enum ObjectOwnerSelectors {
  any = "*",
  self = "!",
}
export type ObjectOwnerID = string | ObjectOwnerSelectors;
export enum ObjectIDSelector {
  all = "*",
}
export type ObjectID = string | ObjectIDSelector;

export type PolicyEntityCreationParams = {
  action: string;
  objectType: string;
  objectOwner: ObjectOwnerID;
  objectId: ObjectID;
};

export type PolicyEntityReconstitutionParams = PolicyEntityCreationParams & {
  id: string;
};

export type PolicyEntityParams = {};
export class PolicyEntity extends Entity {
  private _id: string;
  private _action: string;
  private _objectType: string;
  private _objectOwner: ObjectOwnerID;
  private _objectId: ObjectID;

  //Contructor and factories
  private constructor(params: {
    id: string;
    action: string;
    objectType: string;
    objectOwner: ObjectOwnerID;
    objectId: ObjectID;
  }) {
    super();
    this._id = params.id;
    this._action = params.action;
    this._objectType = params.objectType;
    this._objectOwner = params.objectOwner;
    this._objectId = params.objectId;
  }

  public static create(params: PolicyEntityCreationParams): PolicyEntity {
    return new PolicyEntity({ id: uuid(), ...params });
  }

  public static reconstitute(params: PolicyEntityReconstitutionParams) {
    return new PolicyEntity(params);
  }

  get id(): string {
    return this._id;
  }
  // Getters and setters
  get action(): string {
    return this._action;
  }

  get objectType(): string {
    return this._objectType;
  }

  get objectOwner(): string {
    return this._objectOwner;
  }

  get objectId(): string {
    return this._objectId;
  }

  // behavior
  hasAccess(userId: string, request: AccessRequest): boolean {
    return (
      (request.action === this.action || this.action === "*") &&
      (request.objectType === this.objectType || this.objectType == "*") &&
      (request.objectOwner === this.objectOwner ||
        this.objectOwner === "*" ||
        (this.objectOwner === "!" && request.objectOwner === userId)) &&
      (request.objectId === this.objectId || this.objectId === "*")
    );
  }
}

//Failures
export abstract class IPolicyFailure extends Failure {}
