import { Result } from "ts-results";
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";

export interface IUserRepository {
  save(
    user: UserAggregate
  ): Promise<Result<null, IUserRepositoryFailure>>;

  getGroupEntitiesByNames(
    ids: string[]
  ): Promise<GroupEntity[]>;

  getGroupEntitiesByNames(
    ids: string[]
  ): Promise<GroupEntity[]>;

  getUserById(
    id: string
  ): Promise<Result<UserAggregate, UserNotFound>>;
}

export abstract class IUserRepositoryFailure {}

export class UserDatabaseWriteFailure extends IUserRepositoryFailure {}
export class UserNotFound extends IUserRepositoryFailure {}
