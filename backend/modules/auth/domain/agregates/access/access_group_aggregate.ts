import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { UnimplementedError } from "../../../../../core/errors/general";
import Aggregate from "../../../../../core/interfaces/aggregate";
import {
  AccessControlGroupEntity,
  IAccessControlGroupParams,
} from "../../entities/access/access_control_group";
import { AccessControlUserEntity } from "../../entities/access/access_control_user";

export interface IAccessControlGroupAggregateParams {
  _users: AccessControlUserEntity[];
}

export class AccessControlGroupAggregate extends Aggregate<AccessControlGroupEntity> {
  private constructor(root: AccessControlGroupEntity) {
    super(root);
  }

  public static create(
    params: IAccessControlGroupParams
  ): AccessControlGroupAggregate {
    return new AccessControlGroupAggregate(
      AccessControlGroupEntity.create(params)
    );
  }

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
