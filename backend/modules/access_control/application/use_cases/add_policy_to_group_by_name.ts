import { Err, Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../core/interfaces/failure";
import PolicyDTO from "../dto/policy_dto";
import { PolicyByNameAdditionDTO } from "../dto/new_access_control_policy_dto";
import PolicyMap from "../mappers/access_control_policy_map";
import { IGroupRepository } from "../repo_interfaces/group_repo";

export abstract class IAddPolicyToGroupFailure extends Failure {}
export class GroupNotFound extends IAddPolicyToGroupFailure {}
export class DatabaseSaveFailure extends IAddPolicyToGroupFailure {}

export class AddPolicyToGroupByName {
  private _groupRepository: IGroupRepository;

  constructor(groupRepository: IGroupRepository) {
    this._groupRepository = groupRepository;
  }

  async execute(
    dto: PolicyByNameAdditionDTO
  ): Promise<Result<PolicyDTO, IAddPolicyToGroupFailure>> {
    const groupOrfailure =
      await this._groupRepository.getGroupByName(
        new UniqueEntityID(dto.groupName)
      );
    if (groupOrfailure.err) return Err(new GroupNotFound());

    const group = groupOrfailure.val
    const policy = PolicyMap.fromDTOtoEntity(dto)
    group.addPolicy(policy);
    
    const savedOrFailure = await this._groupRepository.save(groupOrfailure.val)
    if(savedOrFailure.err) return Err(new DatabaseSaveFailure());
    return Ok(PolicyMap.fromEntityToDTO(policy))
  }
}
