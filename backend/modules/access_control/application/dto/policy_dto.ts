import { PolicyAttributeDTO } from "./policy_attribute_dto";

export default interface PolicyDTO {
  id: string,
  action: string,
  attributes: PolicyAttributeDTO[]
} 
