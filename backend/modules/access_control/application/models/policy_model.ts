import { text } from "express";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import GroupModel from "./group_model";
import PolicyAttributeModel from "./policy_attribute_model";

@Entity("access_policy")
export default class PolicyModel extends BaseEntity {

  @PrimaryColumn({type:'uuid'})
  id: string;

  @Column({type:"varchar", length:6})
  action: string;


  @ManyToOne(() => GroupModel, (group) => group.policies)
  group: GroupModel

  @OneToMany(() => PolicyAttributeModel, (attribute) => attribute.policy)
  attributes: PolicyAttributeModel[]
}
