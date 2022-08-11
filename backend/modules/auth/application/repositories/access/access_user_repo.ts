import { Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import { AccessUserAggregate } from "../../../domain/agregates/access/access_user_aggregate";

export interface IAccessUserRepoFailure extends Failure {}

export interface IAccessUserRepository {
  save(): Promise<Result<void, IAccessUserRepoFailure>>;
  getAccessUserById(
    id: UniqueEntityID
  ): Promise<Result<AccessUserAggregate, IAccessUserRepoFailure>>;
}
