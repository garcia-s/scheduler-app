import { Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";

export interface IUserRepository {
  save(
    user: UserAggregate
  ): Promise<Result<null, IUserRepositoryFailure>>;

  getGroupEntitiesByIds(
    ids: UniqueEntityID[]
  ): Promise<GroupEntity[]>;

  getGroupEntitiesByNames(
    ids: string[]
  ): Promise<GroupEntity[]>;

  getUserById(
    id: UniqueEntityID
  ): Promise<Result<UserAggregate, UserNotFound>>;
}

export abstract class IUserRepositoryFailure {}

export class UserDatabaseWriteFailure extends IUserRepositoryFailure {}
export class UserNotFound extends IUserRepositoryFailure {}
