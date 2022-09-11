import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('auth_user')
export default class UserModel extends BaseEntity {
  @PrimaryColumn({type: 'uuid'})
  id: string;

  @Column({type: "varchar",length: 50})
  username: string;

  @Column({type:'text'})
  password: string

  @Column({type:'text'})
  salt: string;
  // constructor(id: string, email: string, password: string) {
  //   super();
  //   this.id = id;
  //   this.password = password;
  //   this.email = email;
  // }
}


