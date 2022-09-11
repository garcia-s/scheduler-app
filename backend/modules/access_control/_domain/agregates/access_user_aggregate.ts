import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import Aggregate from "../../../../core/interfaces/aggregate";
import Failure from "../../../../core/interfaces/failure";
import { GroupEntity } from "../entities/access_control_group";
import { IUserParams, UserEntity } from "../entities/access_control_user";
import AccessRequestEvent from "../events/access_request_event";
import AddedGroupsToUserEvent from "../events/added_group_to_user_event";
import { AccessRequest } from "../value_objects/access_request";

export class UserAggregate extends Aggregate<UserEntity> {
	private constructor(root: UserEntity) {
		super(root);
	}

	public get username(): string {
		return this.root.username;
	}

	public get groups(): GroupEntity[] {
		return this.root.groups;
	}

	// Creation factory
	public static create(
		id: UniqueEntityID,
		username: string
	): UserAggregate {
		const root = UserEntity.create(id, username);
		return new UserAggregate(root);
	}

	public static reconstitute(
		id: UniqueEntityID,
		params: IUserParams
	): UserAggregate {
		const root = UserEntity.reconstitute(id, params);
		return new UserAggregate(root);
	}

	public addGroups(groups: GroupEntity[]): void {
		this.root.addGroups(groups);
		this.addDomainEvent(
			new AddedGroupsToUserEvent(this.root.id, this.root.groups)
		);
	}

	public hasAccess(request: AccessRequest): boolean {
		const access = this.root.hasAccess(request);
		this.addDomainEvent(
			new AccessRequestEvent(this.root.id, this.root.username, request)
		);
		this.dispatchEventForAggregate();
		return access;
	}
}

// -------------------- Failures ---------------------

// Interface
export abstract class IUserAggregateFailure extends Failure { }

export class InvalidAccesUserRootEntityFailure extends IUserAggregateFailure { }
