import { Err, Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import AccessControlUserDTO from "../../dto/access/access_control_user_dto";
import AccessControlUserMap from "../../mappers/access/access_control_user_map";
import { IAccessControlUserRepository } from "../../repositories/access/access_control_user_repo";

export abstract class IGetAccessControlUserFailure extends Failure {}
export class UserNotFound extends IGetAccessControlUserFailure {}

export class GetAccessControlUserBy {
  accessControlUserRepository: IAccessControlUserRepository;

  constructor(accessControlUserRepository: IAccessControlUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(id: string): Promise<Result<AccessControlUserDTO, Failure>> {
    const userOrFailure = await this.accessControlUserRepository.getUserById(
      new UniqueEntityID(id)
    );

    if (userOrFailure.err) return Err(new UserNotFound());
    return Ok(AccessControlUserMap.fromAggregateToDTO(userOrFailure.val));
  }
}
