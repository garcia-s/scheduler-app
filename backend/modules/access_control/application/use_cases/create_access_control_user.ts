import { string } from "fp-ts";
import { Err, Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import { UserAggregate } from "../../_domain/agregates/access_user_aggregate";
import UserDTO from "../dto/access_control_user_dto";
import NewUserDTO from "../dto/new_access_control_user_dto";
import UserMap from "../mappers/access_control_user_map";
import { IUserRepository } from "../repositories/access_control_user_repo";

export class CreateUser {
  accessControlUserRepository: IUserRepository;

  constructor(accessControlUserRepository: IUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(
    user: NewUserDTO
  ): Promise<Result<UserDTO, ICreateUserFailure>> {
    // map the groups to uniqueEntityID,

    // create the user group

    const userAggregate = UserAggregate.create(
      new UniqueEntityID(user.id),
      user.username
    );

    const groups =
      await this.accessControlUserRepository.getGroupEntitiesByNames(
        user.accessControlGroupNames
      );

    userAggregate.addGroups(groups);
    const saveOrFailure = await this.accessControlUserRepository.save(
      userAggregate
    );

    if (saveOrFailure.err)
      return Err(new CreateUserUnableToWriteToDatabaseFailure());
    return Ok(UserMap.fromAggregateToDTO(userAggregate));
  }
}

export abstract class ICreateUserFailure extends Failure {}
export class CreateUserInvalidstringFailure extends ICreateUserFailure {}
export class CreateUserUnableToWriteToDatabaseFailure extends ICreateUserFailure {}
