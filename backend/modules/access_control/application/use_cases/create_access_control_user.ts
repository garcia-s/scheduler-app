import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { Username } from "../../../../core/value_objects/username";
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import UserDTO from "../dto/user_dto";
import NewUserDTO from "../dto/new_access_control_user_dto";
import UserMap from "../mappers/access_control_user_map";
import { IUserRepository } from "../repo_interfaces/user_repo";

export class CreateUser {
  accessControlUserRepository: IUserRepository;

  constructor(accessControlUserRepository: IUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(
    user: NewUserDTO
  ): Promise<Result<UserDTO, ICreateUserFailure>> {
    // map the groups to string,

    // create the user group
    const usernameOrFailure = Username.create(user.username);

    if (usernameOrFailure.err) return Err(new InvalidUsernameFailure());

    const userAggregate = UserAggregate.create(user.id, usernameOrFailure.val);

    const groups =
      await this.accessControlUserRepository.getGroupEntitiesByNames(
        user.groups
      );

    userAggregate.addGroups(groups);
    const saveOrFailure = await this.accessControlUserRepository.save(
      userAggregate
    );

    if (saveOrFailure.err) return Err(new DatabaseWriteFailure());
    return Ok(UserMap.fromAggregateToDTO(userAggregate));
  }
}

export abstract class ICreateUserFailure extends Failure {}
export class InvalidUsernameFailure extends ICreateUserFailure {}
export class DatabaseWriteFailure extends ICreateUserFailure {}
