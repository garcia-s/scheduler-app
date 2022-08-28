import { IAccessControlGroupRepository } from "../../repositories/access/access_control_group_repo";

export class AddPolicyToGroup{
    
    private _groupRepository: IAccessControlGroupRepository;

    constructor(groupRepository: IAccessControlGroupRepository) {
        this._groupRepository = groupRepository
    }

    execute()
}