import UserDTO from "../../dto/authentication/authentication_user_dto";
import { AuthenticationUser } from "../../../domain/entities/authentication/authentication_user";
import { AuthenticationUserAggregate } from "../../../domain/agregates/authentication/authentication_user_aggregate";
import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id";
import UserModel from "../../models/auth/user_model";
import { EmailAddress } from "../../../../../core/domain/value_objects/email";
import { PasswordHash } from "../../../domain/value_objects/password_hash";

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
          email: EmailAddress.reconstitute(user.email),
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
