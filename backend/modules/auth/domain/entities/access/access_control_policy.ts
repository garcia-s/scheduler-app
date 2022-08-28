import { Err, Ok, Result } from "ts-results";

import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { Entity } from "../../../../../core/interfaces/entity";
import Failure from "../../../../../core/interfaces/failure";

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
  subject: string;
  action: string;
  objectType: string;
  objectOwner: ObjectOwnerID;
  objectId: ObjectID;
}

export class AccessControlPolicyEntity extends Entity<IAccessControlPolicyParams> {
  
  get subject()  : string {
    return this.props.subject
  }

  get action() : string {
    return this.props.action
  }

  get objectType() : string{
    return this.props.objectType
  }

  get objectOwner() : string {
    return this.props.objectOwner
  }
  
  get objectId() : string {
    return this.props.objectOwner
  }
  
  private constructor(params: IAccessControlPolicyParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(
    params: IAccessControlPolicyParams
  ): Result<AccessControlPolicyEntity, IAccessControlPolicyFailure> {
    return Ok(new AccessControlPolicyEntity(params));
  }

  public static reconstitute( params: IAccessControlPolicyParams, id: UniqueEntityID) {
    return new AccessControlPolicyEntity(params, id)
  }
}

//Failures
export abstract class IAccessControlPolicyFailure extends Failure {}