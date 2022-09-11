import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import GroupModel from "./access_control_group_model";

@Entity("access_user")
class UserModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ unique: true, type: "text" })
  username: string;

  @ManyToMany(() => GroupModel, (group) => group.users, {
    cascade: true,
  })
  @JoinTable()
  groups: GroupModel[];
  // relationship with access control group Many to Many
}

export default UserModel;
