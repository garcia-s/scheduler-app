import { text } from "express";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import AccessControlGroupModel from "./access_control_group_model";

@Entity("access_policy")
export default class AccessControlPolicyModel extends BaseEntity {

  @PrimaryColumn({type:'uuid'})
  id: string;

  @Column({type: 'text'})
  subject: string;

  @Column({type:"varchar", length:6})
  action: string;

  @Column({type: 'varchar', length: 30})
  objectType: string;

  @Column({type: 'text'})
  objectOwner: string;

  @Column({type:'text'})
  objectId: string;

  @ManyToOne(() => AccessControlGroupModel, (group) => group.policies)
  group: AccessControlGroupModel
}
