import { AccessUserAggregate } from "../../domain/agregates/access/access_user_aggregate";
import UserDTO from "../dto/user_dto";
import { AccessPolicyCollectionMap } from "./access_policy_collection_map";
import { AccessGroupCollectionMap } from "./access_group_collection_map";

export abstract class AccessUserMap {
  public static fromAggregateToDTO(user: AccessUserAggregate): UserDTO {
    return {
      id: user.id.value,
      email: user.email.value,
      policies: AccessPolicyCollectionMap.fromEntityToDTO(user.policies),
      roles: AccessGroupCollectionMap.fromEntityToDTO(user.roles),
    };
  }
}
