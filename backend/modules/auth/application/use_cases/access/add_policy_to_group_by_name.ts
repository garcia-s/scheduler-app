import { Err, Ok, Result } from "ts-results";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import Failure from "../../../../../core/interfaces/failure";
import AccessControlPolicyDTO from "../../dto/access/access_control_policy_dto";
import { AccessControlPolicyByNameAdditionDTO } from "../../dto/access/new_access_control_policy_dto";
import AccessControlPolicyMap from "../../mappers/access/access_control_policy_map";
import { IAccessControlGroupRepository } from "../../repositories/access/access_control_group_repo";

export abstract class IAddPolicyToGroupFailure extends Failure {}
export class GroupNotFound extends IAddPolicyToGroupFailure {}
export class DatabaseSaveFailure extends IAddPolicyToGroupFailure {}

export class AddPolicyToGroupByName {
  private _groupRepository: IAccessControlGroupRepository;

  constructor(groupRepository: IAccessControlGroupRepository) {
    this._groupRepository = groupRepository;
  }

  async execute(
    dto: AccessControlPolicyByNameAdditionDTO
  ): Promise<Result<AccessControlPolicyDTO, IAddPolicyToGroupFailure>> {
    const groupOrfailure =
      await this._groupRepository.getAccessControlGroupByName(
        new UniqueEntityID(dto.groupName)
      );
    if (groupOrfailure.err) return Err(new GroupNotFound());

    const group = groupOrfailure.val
    const policy = AccessControlPolicyMap.fromDTOtoEntity(dto)
    group.addPolicy(policy);
    
    const savedOrFailure = await this._groupRepository.save(groupOrfailure.val)
    if(savedOrFailure.err) return Err(new DatabaseSaveFailure());
    return Ok(AccessControlPolicyMap.fromEntityToDTO(policy))
  }
}
