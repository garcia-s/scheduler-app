import { AccessGroup } from "../../domain/entities/access/access_group";
import AccessGroupDTO from "../dto/access_role_dto";
import { AccessPolicyCollectionMap } from "./access_policy_collection_map";

export abstract class AccessGroupCollectionMap {
  public static fromEntityToDTO(roles: AccessGroup[]): AccessGroupDTO[] {
    return roles.map((element) => ({
      id: element.id.value,
      name: element.name,
      policies: AccessPolicyCollectionMap.fromEntityToDTO(element.policies),
    }));
  }
}
