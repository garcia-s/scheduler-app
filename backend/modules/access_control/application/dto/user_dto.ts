import GroupDTO from "./role_dto";


export default interface UserDTO  {
    id: string,
    accessControlGroups: GroupDTO[],
}