import { string } from "fp-ts";
import GroupDTO from "./role_dto";

export default interface NewUserDTO  {
    id: string,
    username: string,
    groups: string[],
}