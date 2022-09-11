import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import PolicyModel from "./access_control_policy_model";
import UserModel from "./access_control_user_model";

@Entity("access_group")
export default class GroupModel extends BaseEntity {
  
  @PrimaryColumn({ type: "varchar", length: 200, unique:true })
  name: string;

  @OneToMany(() => PolicyModel, (policy) => policy.group)
  policies: PolicyModel[];
  users: UserModel[];
}
