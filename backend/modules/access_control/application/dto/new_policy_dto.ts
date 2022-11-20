import { PolicyAttributeDTO } from "./policy_attribute_dto";

export default interface NewPolicyDTO {
  action: string;
  attributes: PolicyAttributeDTO[]
}
