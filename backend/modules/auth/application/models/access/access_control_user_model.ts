import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import AccessControlGroupModel from "./access_control_group_model";

@Entity("access_user")
class AccessControlUserModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ unique: true, type: "text" })
  username: string;

  @ManyToMany(() => AccessControlGroupModel, (group) => group.users, {
    cascade: true,
  })
  @JoinTable()
  groups: AccessControlGroupModel[];
  // relationship with access control group Many to Many
}

export default AccessControlUserModel;
