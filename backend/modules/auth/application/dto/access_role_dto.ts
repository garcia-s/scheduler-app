import AccessPolicyDTO from "./access_policy_dto";

export default interface AccessGroupDTO {
  id: string;
  name: string;
  policies: AccessPolicyDTO[];
}
