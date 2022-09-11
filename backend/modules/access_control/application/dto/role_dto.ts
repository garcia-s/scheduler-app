import PolicyDTO from "./policy_dto";

export default interface GroupDTO {
  name: string;
  policies: PolicyDTO[];
}
