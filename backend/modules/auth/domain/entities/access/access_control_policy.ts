import { Err, Ok, Result } from "ts-results";

import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { Entity } from "../../../../../core/interfaces/entity";
import Failure from "../../../../../core/interfaces/failure";
import { AccessRequest } from "../../value_objects/access_request";

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

export interface IAccessControlPolicyParams {
  action: string;
  objectType: string;
  objectOwner: ObjectOwnerID;
  objectId: ObjectID;
}

export class AccessControlPolicyEntity extends Entity<IAccessControlPolicyParams> {
  //Contructor and factories
  private constructor(params: IAccessControlPolicyParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(
    params: IAccessControlPolicyParams
  ): AccessControlPolicyEntity {
    return new AccessControlPolicyEntity(params);
  }

  public static reconstitute(
    params: IAccessControlPolicyParams,
    id: UniqueEntityID
  ) {
    return new AccessControlPolicyEntity(params, id);
  }

  // Getters and setters
  get action(): string {
    return this.props.action;
  }

  get objectType(): string {
    return this.props.objectType;
  }

  get objectOwner(): string {
    return this.props.objectOwner;
  }

  get objectId(): string {
    return this.props.objectOwner;
  }

  // behavior

  hasAccess(userId: UniqueEntityID, request: AccessRequest): boolean {
    return (
      (request.action === this.action || request.action === "*") &&
      (request.objectOwner === this.objectOwner ||
        this.objectOwner === "*" ||
        (this.objectOwner === "!" && userId.value === request.objectOwner)) &&
      (request.objectId === this.objectId || this.objectId === "*") &&
      request.objectType === this.objectType
    );
  }
}

//Failures
export abstract class IAccessControlPolicyFailure extends Failure {}
