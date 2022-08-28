import AccessControlGroupDTO from "./access_control_role_dto";


export default interface AccessControlUserDTO  {
    id: string,
    username: string,
    accessControlGroups: AccessControlGroupDTO[],
}