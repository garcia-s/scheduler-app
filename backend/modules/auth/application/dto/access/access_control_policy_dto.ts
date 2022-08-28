export default interface AccessControlPolicyDTO {
  id: string,
  action: string,
  subject: string,
  objectId: string,
  objectOwner: string,
  objectType: string,
} 
