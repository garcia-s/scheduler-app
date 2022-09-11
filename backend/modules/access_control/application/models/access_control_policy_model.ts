import { text } from "express";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import GroupModel from "./access_control_group_model";

@Entity("access_policy")
export default class PolicyModel extends BaseEntity {

  @PrimaryColumn({type:'uuid'})
  id: string;

  @Column({type:"varchar", length:6})
  action: string;

  @Column({type: 'varchar', length: 30})
  objectType: string;

  @Column({type: 'text'})
  objectOwner: string;

  @Column({type:'text'})
  objectId: string;

  @ManyToOne(() => GroupModel, (group) => group.policies)
  group: GroupModel
}
