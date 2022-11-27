import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { Username } from "../../../../core/value_objects/username";
import { UserAggregate } from "../../_domain/aggregates/access_user_aggregate";
import UserDTO from "../dto/user_dto";
import NewUserDTO from "../dto/new_access_control_user_dto";
import UserMap from "../mappers/access_control_user_map";
import { IUserRepository } from "../repo_interfaces/user_repo";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";

export class CreateUser {
  accessControlUserRepository: IUserRepository;

  constructor(accessControlUserRepository: IUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(
    user: NewUserDTO
  ): Promise<Result<UserDTO, ICreateUserFailure>> {
    
    const userAggregate = UserAggregate.create(
      UUIDEntityID.reconstitute(user.id)
    );
    const groupsOrFailure =
      await this.accessControlUserRepository.getGroupEntitiesByNames(
        user.groups
      );
    if (groupsOrFailure.err) return Err(new DatabaseReadFailure());
    userAggregate.addGroups(groupsOrFailure.val);
    const saveOrFailure = await this.accessControlUserRepository.save(
      userAggregate
    );
    if (saveOrFailure.err) return Err(new DatabaseWriteFailure());
    return Ok(UserMap.fromAggregateToDTO(userAggregate));
  }
}

export abstract class ICreateUserFailure extends Failure {}
export class DatabaseWriteFailure extends ICreateUserFailure {}
export class DatabaseReadFailure extends ICreateUserFailure {}
