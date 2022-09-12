import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import AccessRequestDTO from "../dto/access_request_dto";
import AccessRequestMap from "../mappers/request_map";
import { IUserRepository } from "../repo_interfaces/user_repo";

export class UserNotFoundFailure extends Failure {}

export class RequestAccessUseCase {
  private _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(
    accessRequest: AccessRequestDTO
  ): Promise<Result<boolean, UserNotFoundFailure>> {
    const userOrFailure = await this._userRepository.getUserById(
      accessRequest.subject
    );

    if (userOrFailure.err) return Err(new UserNotFoundFailure());

    const user = userOrFailure.val;
    const hasAccess = user.hasAccess(
      AccessRequestMap.fromDTOToValueObject(accessRequest)
    );
    return Ok(hasAccess);
  }
}
