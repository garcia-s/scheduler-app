import NewPolicyDTO from "./new_policy_dto";

export default interface NewGroupDTO {
  name: string;
  policies: NewPolicyDTO[];
}
