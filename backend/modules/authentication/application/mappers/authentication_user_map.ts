import AuthenticationUserDTO from "../dto/authentication_user_dto";
import UserModel from "../models/user_model";
import { AuthenticationUserAggregate } from "../../_domain/aggregates/authentication_user_aggregate";
import { Username } from "../../../../core/value_objects/username";
import { Password } from "../../_domain/value_objects/password";
import { RecoveryToken } from "../../_domain/value_objects/recovery_token";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";

export abstract class AuthenticationUserMap {
  public static fromModelToAggregate(
    model: UserModel
  ): AuthenticationUserAggregate {
    return AuthenticationUserAggregate.reconstitute({
      id: UUIDEntityID.reconstitute(model.id),
      username: Username.reconstitute(model.username),
      password: Password.reconstitute({
        passwordHash: model.passwordHash,
        passwordSalt: model.passwordSalt,
        encryptionCycles: model.encryptionCycles,
      }),
      recoveryToken: model.recoveryToken
        ? RecoveryToken.reconstitute({
            token: model.recoveryToken,
            timestamp: model.recoveryTimestamp!,
          })
        : undefined,
    });
  }

  public static fromAggregateToModel(
    user: AuthenticationUserAggregate
  ): UserModel {
    const userModel = new UserModel();
    userModel.id = user.id.value;
    userModel.username = user.username.value;
    userModel.passwordHash = user.password.passwordHash;
    userModel.passwordSalt = user.password.passwordSalt;
    userModel.encryptionCycles = user.password.encryptionCycles;
    userModel.recoveryToken = user.recoveryToken
      ? user.recoveryToken.token
      : undefined;
    userModel.recoveryTimestamp = user.recoveryToken
      ? user.recoveryToken.timestamp.toISOString()
      : undefined;
    return userModel;
  }

  public static fromAggregateToDTO(
    aggregate: AuthenticationUserAggregate
  ): AuthenticationUserDTO {
    return {
      id: aggregate.id.value,
      username: aggregate.username.value,
    };
  }
}
