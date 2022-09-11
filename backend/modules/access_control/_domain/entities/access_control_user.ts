import { Entity } from "../../../../core/interfaces/entity";
import { AccessRequest } from "../value_objects/access_request";
import { GroupEntity } from "./access_control_group";

export class UserEntity extends Entity {
  private _id: string;
  private _username: string;
  private _accessControlGroups: GroupEntity[];

  private constructor(params: {
    id: string;
    username: string;
    accessControlGroups: GroupEntity[];
  }) {
    super();
    this._id = params.id;
    this._username = params.username;
    this._accessControlGroups = params.accessControlGroups;
  }

  public static create(id: string, username: string): UserEntity {
    const userGroup = GroupEntity.create(username, []);
    return new UserEntity({
      id: id,
      username: username,
      accessControlGroups: [userGroup],
    });
  }

  public static reconstitute(params: {
    id: string;
    username: string;
    accessControlGroups: GroupEntity[];
  }): UserEntity {
    return new UserEntity(params);
  }

  get id(): string {
    return this._id;
  }

  public get groups(): GroupEntity[] {
    return this._accessControlGroups;
  }

  public get username(): string {
    return this._username;
  }

  public addGroups(groups: GroupEntity[]): void {
    this._accessControlGroups = [...this._accessControlGroups, ...groups];
  }

  hasAccess(request: AccessRequest) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].hasAccess(this._id, request)) return true;
    }
    return false;
  }
}
