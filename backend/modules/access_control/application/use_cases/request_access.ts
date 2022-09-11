import { Err, Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../core/interfaces/failure";
import AccessRequestDTO from "../dto/access_request_dto";
import AccessRequestMap from "../mappers/access_request_map";
import { IUserRepository } from "../repositories/access_control_user_repo";


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
      new UniqueEntityID(accessRequest.subject)
    );

    if (userOrFailure.err) return Err(new UserNotFoundFailure());

    const user = userOrFailure.val;
    const hasAccess = user.hasAccess(
      AccessRequestMap.fromDTOToValueObject(accessRequest)
    );
    return Ok(hasAccess);
  }
}
