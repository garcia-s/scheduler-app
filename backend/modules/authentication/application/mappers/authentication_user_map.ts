import UserDTO from "../dto/authentication_user_dto";
import { AuthenticationUser } from "../../_domain/entities/authentication_user";
import UniqueEntityID from "../../../../core/domain/value_objects/unique_entity_id";
import UserModel from "../models/user_model";
import { string } from "../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../_domain/value_objects/password_hash";
import { AuthenticationUserAggregate } from "../../_domain/agregates/authentication_user_aggregate";

export abstract class AuthenticationUserMap {
  public static fromEntityToDTO(user: AuthenticationUser): UserDTO {
    return {
      id: user.id.value,
      email: user.email.value,
    };
  }
  public static fromModelToAggregate(
    user: UserModel
  ): AuthenticationUserAggregate {
    
    return AuthenticationUserAggregate.recostitute(
      AuthenticationUser.reconstitute(
        {
          passwordHash: PasswordHash.reconstitute(user.password),
          email: string.reconstitute(user.email),
        },
        new UniqueEntityID(user.id)
      )
    );
  }

  public static fromAggregateToModel(user: AuthenticationUserAggregate): UserModel {
    const userModel = new UserModel();
    userModel.id = user.id.value;
    userModel.email = user.email.value;
    userModel.password = user.password.value
    return userModel
  }
}
