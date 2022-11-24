import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('auth_user')
export default class UserModel extends BaseEntity {
  @PrimaryColumn({type: 'uuid'})
  id: string;

  @Column({type: "varchar",length: 50})
  username: string;

  @Column({type:'text'})
  passwordHash: string

  @Column({type:'text'})
  passwordSalt: string;

  @Column({type:'integer'})
  encryptionCycles: number;

  @Column({type:'varchar', length:8, nullable: true})
  recoveryToken?: string;

  @Column({type:'timestamp', nullable: true})
  recoveryTimestamp?: string;
  // constructor(id: string, email: string, password: string) {
  //   super();
  //   this.id = id;
  //   this.password = password;
  //   this.email = email;
  // }
}


