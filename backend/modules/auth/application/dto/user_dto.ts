import AccessPolicyDTO from "./access_policy_dto";
import AccessGroupDTO from "./access_role_dto";

export default interface UserDTO {
  id: string;
  email: string;
  roles: AccessGroupDTO[];
  policies: AccessPolicyDTO[];
}
