import { Err, Ok, Result } from "ts-results";
import Failure from "../../../../core/interfaces/failure";
import { GroupAggregate } from "../../_domain/aggregates/access_group_aggregate";
import NewGroupDTO from "../dto/new_group_dto";
import GroupDTO from "../dto/role_dto";
import GroupMap from "../mappers/group_map";
import { IGroupRepository } from "../repo_interfaces/group_repo";

export class CreateGroup {
  private _repository: IGroupRepository;

  constructor(repository: IGroupRepository) {
    this._repository = repository;
  }

  async execute(group: NewGroupDTO): Promise<Result<GroupDTO, Failure>> {
    const groupAggregate = GroupMap.fromCreationalDTOToAggregate(group);
    const saveOrFailure = await this._repository.save(groupAggregate);
    if (saveOrFailure.err) return Err(new DatabaseWriteFailure());
    return Ok(GroupMap.fromEntityToDTO(groupAggregate.root));
  }
}

export class DatabaseWriteFailure extends Failure {}
