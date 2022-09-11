import GroupDTO from "./role_dto";


export default interface UserDTO  {
    id: string,
    username: string,
    accessControlGroups: GroupDTO[],
}