export default interface AccessPolicyDTO {
  id: string;
  resourceType: string;
  resources?: string[];
  accessAll: boolean;
}
