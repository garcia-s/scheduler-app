import { string } from "fp-ts";
import AccessControlGroupDTO from "./access_control_role_dto";

export default interface NewAccessControlUserDTO  {
    id: string,
    username: string,
    accessControlGroupNames: string[],
}