import { string } from "fp-ts";
import { Err, Ok, Result } from "ts-results";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import { AccessControlGroupAggregate } from "../../../domain/agregates/access/access_group_aggregate";
import { AccessControlUserAggregate } from "../../../domain/agregates/access/access_user_aggregate";
import AccessControlUserDTO from "../../dto/access/access_control_user_dto";
import NewAccessControlUserDTO from "../../dto/access/new_access_control_user_dto";
import AccessControlUserMap from "../../mappers/access/access_control_user_map";
import { IAccessControlGroupRepository } from "../../repositories/access/access_control_group_repo";
import { IAccessControlUserRepository } from "../../repositories/access/access_control_user_repo";

export class CreateAccessControlUser {
  accessControlUserRepository: IAccessControlUserRepository;

  constructor(accessControlUserRepository: IAccessControlUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(
    user: NewAccessControlUserDTO
  ): Promise<Result<AccessControlUserDTO, ICreateAccessControlUserFailure>> {
    // map the groups to uniqueEntityID,

    // create the user group

    const userAggregate = AccessControlUserAggregate.create(
      new UniqueEntityID(user.id),
      user.username
    );

    const groups =
      await this.accessControlUserRepository.getAccessControlGroupEntitiesByNames(
        user.accessControlGroupNames
      );

    userAggregate.addGroups(groups);
    const saveOrFailure = await this.accessControlUserRepository.save(
      userAggregate
    );

    if (saveOrFailure.err)
      return Err(new CreateAccessControlUserUnableToWriteToDatabaseFailure());
    return Ok(AccessControlUserMap.fromAggregateToDTO(userAggregate));
  }
}

export abstract class ICreateAccessControlUserFailure extends Failure {}
export class CreateAccessControlUserInvalidEmailAddressFailure extends ICreateAccessControlUserFailure {}
export class CreateAccessControlUserUnableToWriteToDatabaseFailure extends ICreateAccessControlUserFailure {}
