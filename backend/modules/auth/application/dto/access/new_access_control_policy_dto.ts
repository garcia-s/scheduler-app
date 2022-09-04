export type AccessControlPolicyByNameAdditionDTO = {
    id: string,
    groupName: string, 
    action: string,
    subject: string,
    objectId: string,
    objectOwner: string,
    objectType: string,
}