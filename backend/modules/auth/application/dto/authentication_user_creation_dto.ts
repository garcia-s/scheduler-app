import AccessPolicyDTO from "./access_policy_dto";
import AccessGroupDTO from "./access_role_dto";

export interface AuthenticationUserCreationDTO {
  email: string;
  password: string;
  policies: AccessPolicyDTO[];
  roles: string[];
}
