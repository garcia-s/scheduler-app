import { Err, Ok, Result } from "ts-results";
import { Entity } from "../../../../core/interfaces/entity";
import Failure from "../../../../core/interfaces/failure";
import { AccessRequest } from "../value_objects/access_request";
import { v4 as uuid } from "uuid";
import { PolicyAttribute } from "../value_objects/policy_attribute";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";

// Policies should have:
//
// Subject: Person who we are refering to
//
// Act: the action to be executed to the object => CRUD.
//
// Object: The resource being accessed by the subject.
// And this should contain the characterstics needed to determine the resource identity.


export type PolicyEntityCreationParams = {
  action: string;
  attributes: PolicyAttribute[];
};

export type PolicyEntityReconstitutionParams = PolicyEntityCreationParams & {
  id: UUIDEntityID;
};

export type PolicyEntityParams = {};
export class PolicyEntity extends Entity {
  private _action: string;
  private _attributes: PolicyAttribute[];

  //Contructor and factories
  private constructor(params: {
    id: UUIDEntityID;
    action: string;
    attributes: PolicyAttribute[];
  }) {
    super(params.id);
    this._id = params.id;
    this._action = params.action;
    this._attributes = params.attributes;
  }

  public static create(params: PolicyEntityCreationParams): Result<PolicyEntity, IPolicyEntityFailure> {
    for(let i = 0; i < params.attributes.length ; i++) {
      for(let j = i; j < params.attributes.length; j++) {
        if(params.attributes[i].name === params.attributes[j].name)
        return Err(new DuplicatedPolicyName());
      }
    }
    return Ok(new PolicyEntity({ id: UUIDEntityID.create(), ...params }));
  }

  public static reconstitute(params: PolicyEntityReconstitutionParams) {
    return new PolicyEntity(params);
  }

  get id(): UUIDEntityID {
    return this._id;
  }
  // Getters and setters
  get action(): string {
    return this._action;
  }

  get attributes(): PolicyAttribute[] {
    return this._attributes;
  }

  // behavior
  hasAccess(request: AccessRequest): boolean {
    if(request.action !== this.action) return false;
    if (request.attributes.length !== this.attributes.length) return false;

    for (let i = 0; i < request.attributes.length; i++) {
      let foundAttribute = false;

      for (let j = 0; j < this.attributes.length; j++) {
        if (this.attributes[j].hasAccess(request.attributes[i]))
          foundAttribute = true;
      }
      if (!foundAttribute) return false;
    }
    return true;
  }
}

//Failures
abstract class IPolicyEntityFailure extends Failure {}

export class DuplicatedPolicyName extends IPolicyEntityFailure {}
