import AuthenticationUserDTO from "../dto/authentication_user_dto";
import { AuthenticationUser } from "../../_domain/entities/authentication_user";
import UserModel from "../models/user_model";
import { AuthenticationUserAggregate } from "../../_domain/agregates/authentication_user_aggregate";

export abstract class AuthenticationUserMap {
  public static fromEntityToDTO(user: AuthenticationUser): AuthenticationUserDTO {
    return {
      id: user.id,
      username: user.username,
    };
  }

  public static fromModelToAggregate(
    user: UserModel
  ): AuthenticationUserAggregate {
    
    return AuthenticationUserAggregate.recostitute(
        {
          id: user.id,
          passwordSalt: user.salt,
          passwordHash:user.password,
          username:user.username,
        }
    );
  }

  public static fromAggregateToModel(user: AuthenticationUserAggregate): UserModel {
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.username = user.username;
    userModel.password = user.passwordHash;
    userModel.salt = user.passwordSalt;
    return userModel
  }
}
