import { string } from "fp-ts";
import GroupDTO from "./access_control_role_dto";

export default interface NewUserDTO  {
    id: string,
    username: string,
    accessControlGroupNames: string[],
}