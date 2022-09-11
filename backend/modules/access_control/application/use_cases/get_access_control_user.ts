import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import UserDTO from "../dto/user_dto";
import UserMap from "../mappers/access_control_user_map";
import { IUserRepository } from "../repo_interfaces/user_repo";

export class UserNotFoundFailure extends Failure {}

export class GetUserBy {
  accessControlUserRepository: IUserRepository;

  constructor(accessControlUserRepository: IUserRepository) {
    this.accessControlUserRepository = accessControlUserRepository;
  }

  async execute(id: string): Promise<Result<UserDTO, Failure>> {
    const userOrFailure = await this.accessControlUserRepository.getUserById(
      id
    );

    if (userOrFailure.err) return Err(new UserNotFoundFailure());
    return Ok(UserMap.fromAggregateToDTO(userOrFailure.val));
  }
}
