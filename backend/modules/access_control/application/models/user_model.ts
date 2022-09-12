import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import GroupModel from "./group_model";

@Entity("access_user")
class UserModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @ManyToMany(() => GroupModel, (group) => group.users, {
    cascade: true,
  })
  @JoinTable()
  groups: GroupModel[];
  // relationship with access control group Many to Many
}

export default UserModel;
