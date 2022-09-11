import GroupDTO from "./access_control_role_dto";


export default interface UserDTO  {
    id: string,
    username: string,
    accessControlGroups: GroupDTO[],
}