import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import PolicyModel from "./policy_model";

@Entity("access_policy_attribute")
export default class PolicyAttributeModel extends BaseEntity {

  @PrimaryColumn({type:"text"})
  name: string;
  
  @Column({type:"text"})
  value: string;

  @ManyToOne(() => PolicyModel, (policy) => policy.attributes)
  policy: PolicyModel;
}
