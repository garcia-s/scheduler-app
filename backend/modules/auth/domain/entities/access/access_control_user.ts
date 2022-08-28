import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import { Entity } from "../../../../../core/interfaces/entity";
import { AccessControlGroupEntity } from "./access_control_group";

export interface IAccessControlUserParams {
  username: string;
  accessControlGroups: AccessControlGroupEntity[];
}

export class AccessControlUserEntity extends Entity<IAccessControlUserParams> {
  public get groups(): AccessControlGroupEntity[] {
    return this.props.accessControlGroups;
  }
  public get username(): string {
    return this.props.username;
  }

  private constructor(params: IAccessControlUserParams, id?: UniqueEntityID) {
    super(params, id);
  }

  public static create(
    id: UniqueEntityID,
    username: string
  ): AccessControlUserEntity {
    const userGroup = AccessControlGroupEntity.create({
      name: username,
      policies: [],
    });
    return new AccessControlUserEntity(
      {
        username: username,
        accessControlGroups: [userGroup],
      },
      id
    );
  }

  public static reconstitute(
    id: UniqueEntityID,
    params: IAccessControlUserParams
  ): AccessControlUserEntity {
    return new AccessControlUserEntity(params, id);
  }

  public addGroups(groups: AccessControlGroupEntity[]): void {
    this.props.accessControlGroups = [
      ...this.props.accessControlGroups,
      ...groups,
    ];
  }
}
