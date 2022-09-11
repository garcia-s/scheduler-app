import { Err, Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../core/interfaces/failure";
import UserDTO from "../dto/access_control_user_dto";
import UserMap from "../mappers/access_control_user_map";
import { IUserRepository } from "../repositories/access_control_user_repo";

export class UserNotFoundFailure extends Failure {}

export class GetUserBy {
  accessControlUserRepository: IUserRepository;

  constructor(accessControlUserRepository: IUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(id: string): Promise<Result<UserDTO, Failure>> {
    const userOrFailure = await this.accessControlUserRepository.getUserById(
      new UniqueEntityID(id)
    );

    if (userOrFailure.err) return Err(new UserNotFoundFailure());
    return Ok(UserMap.fromAggregateToDTO(userOrFailure.val));
  }
}
