import AccessControlPolicyDTO from "./access_control_policy_dto";

export default interface AccessControlGroupDTO {
  id: string;
  name: string;
  policies: AccessControlPolicyDTO[];
}
