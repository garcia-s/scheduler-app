import PolicyDTO from "./access_control_policy_dto";

export default interface GroupDTO {
  id: string;
  name: string;
  policies: PolicyDTO[];
}
