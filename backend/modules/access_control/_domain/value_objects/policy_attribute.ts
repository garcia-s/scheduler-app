import { Err, Ok, Result } from "ts-results";
import { __param } from "tslib";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";
import ValueObject from "../../../../core/interfaces/value_object";
import { AccessRequestAttribute } from "./request_attribute";

type IPolicyAttributeParams = {
  name: string;
  value: string;
};

export class PolicyAttribute extends ValueObject<IPolicyAttributeParams> {
  private constructor(params: IPolicyAttributeParams) {
    super(params);
  }

  public static create(
    params: IPolicyAttributeParams
  ): Result<PolicyAttribute, DomainObjectValidationFailure> {
    if (
      params.name == null ||
      params.name == "" ||
      params.value == null ||
      params.value == ""
    )
      return Err(new DomainObjectValidationFailure());

    return Ok(new PolicyAttribute(params));
  }

  public static reconstitute(params: {
    name: string;
    value: string;
  }): PolicyAttribute {
    return new PolicyAttribute({
      name: params.name.toLowerCase(),
      value: params.value.toLowerCase(),
    });
  }

  get name(): string {
    return this._value.name;
  }

  get value(): string {
    return this._value.value;
  }

  equals(policy: PolicyAttribute): boolean {
    return this.name === policy.name && this.value === policy.value;
  }

  hasAccess(requestAttribute: AccessRequestAttribute): boolean {
    if (
      this.name !== requestAttribute.name ||
      (this.value !== requestAttribute.value && this.value !== "*")
    )
      return false;
    return true;
  }
}
