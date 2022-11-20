import { PolicyAttributeDTO } from "./policy_attribute_dto";

export default interface AccessRequestDTO {
    subject: string, 
    action: string,
    attributes: PolicyAttributeDTO[]
}