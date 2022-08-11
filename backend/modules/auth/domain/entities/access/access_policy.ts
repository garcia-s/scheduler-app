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


export enum AccessPolicyAction {
  create='create',
  read='read',
  update='update',
  delete='delete'
}


export enum ObjectOwnerSelectors { any= '*', self='!'}
export type ObjectOwnerID = UniqueEntityID | ObjectOwnerSelectors
export enum ObjectIDSelector {all= '*'}
export type ObjectID = UniqueEntityID | ObjectIDSelector

export type AccessPolicyObject = {
  resourceType: string,
  owner: ObjectOwnerID,
  objectID: ObjectID,
}



export interface IAccessPolicyParams {
 subject: UniqueEntityID,
 action: AccessPolicyAction,
 object: AccessPolicyObject,
}

export class AccessPolicy extends Entity<IAccessPolicyParams> {
  private constructor(params: IAccessPolicyParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(
    id: UniqueEntityID,
    params: IAccessPolicyParams,
  ): Result<AccessPolicy, IAccessPolicyFailure> {
    return Ok(new AccessPolicy(params))
  }
}


//Failures
export abstract class IAccessPolicyFailure extends Failure {}
export class ResourcesWhileAccessAll extends IAccessPolicyFailure {}
export class EmptyResourceList extends IAccessPolicyFailure {}
