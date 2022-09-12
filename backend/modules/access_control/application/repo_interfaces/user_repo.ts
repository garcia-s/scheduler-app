import { Result } from "ts-results";
import { UserAggregate } from "../../_domain/aggregates/access_user_aggregate";
import { GroupEntity } from "../../_domain/entities/access_control_group";

export interface IUserRepository {
  save(
    user: UserAggregate
  ): Promise<Result<null, IUserRepositoryFailure>>;

  getGroupEntitiesByNames(
    names: string[]
  ): Promise<Result<GroupEntity[], IUserRepositoryFailure>>

  
  getUserById(
    id: string
  ): Promise<Result<UserAggregate, UserNotFound>>;
}

export abstract class IUserRepositoryFailure {}
export class UserDatabaseReadFailure extends IUserRepositoryFailure {}
export class UserDatabaseWriteFailure extends IUserRepositoryFailure {}
export class UserNotFound extends IUserRepositoryFailure {}
