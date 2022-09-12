import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import PolicyModel from "./policy_model";
import UserModel from "./user_model";

@Entity("access_group")
export default class GroupModel extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 200, unique: true })
  name: string;

  @OneToMany(() => PolicyModel, (policy) => policy.group, { cascade: true })
  policies: PolicyModel[];

  users: UserModel[];
}
