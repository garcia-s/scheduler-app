export default interface AccessRequestDTO {
    subject: string,
    action: string,
    objectOwner: string,
    objectId: string,
    objectType: string,
}