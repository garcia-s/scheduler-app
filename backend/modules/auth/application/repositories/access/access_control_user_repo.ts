import { Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { AccessControlUserAggregate } from "../../../domain/agregates/access/access_user_aggregate";
import { AccessControlGroupEntity } from "../../../domain/entities/access/access_control_group";

export interface IAccessControlUserRepository {
  save(
    user: AccessControlUserAggregate
  ): Promise<Result<null, IAccessControlUserRepositoryFailure>>;

  getAccessControlGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<AccessControlGroupEntity[]>;

  getAccessControlGroupEntitiesByNames(
    ids: string[]
  ): Promise<AccessControlGroupEntity[]>;

  getUserById(
    id: UniqueEntityID
  ): Promise<Result<AccessControlUserAggregate, AccessControlUserNotFound>>;
}

export abstract class IAccessControlUserRepositoryFailure {}

export class AccessControlUserDatabaseWriteFailure extends IAccessControlUserRepositoryFailure {}
export class AccessControlUserNotFound extends IAccessControlUserRepositoryFailure {}
