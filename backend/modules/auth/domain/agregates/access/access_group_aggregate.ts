import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import { AccessGroup } from "../../entities/access/access_group";
import { AccessUser } from "../../entities/access/access_user";

export interface IAccessGroupAggregateParams {
  _users: AccessUser[];
}

export class AccessGroupAggregate extends Aggregate<AccessGroup> {

  addRolePolicy() {
    throw new UnimplementedError();
  }

  removeRolePolicy() {
    throw new UnimplementedError();
  }

  removeUser() {
    throw new UnimplementedError();
  }

  addUser() {
    throw new UnimplementedError();
  }
}
