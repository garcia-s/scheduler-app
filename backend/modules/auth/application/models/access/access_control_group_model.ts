import { DataTypes, Model } from "sequelize";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import AccessControlPolicyModel from "./access_control_policy_model";
import AccessControlUserModel from "./access_control_user_model";


@Entity('access_group')
export default class AccessControlGroupModel extends BaseEntity {

  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @OneToMany(() => AccessControlPolicyModel, (policy) => policy.group)
  policies: AccessControlPolicyModel[];
  
  users: AccessControlUserModel[];
}
