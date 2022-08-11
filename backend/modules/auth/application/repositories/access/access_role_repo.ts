import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessGroup } from "../../../domain/entities/access/access_group";

export default interface IAccessGroupRepository {
  getRoleList(list: UniqueEntityID[]): AccessGroup[];
}
