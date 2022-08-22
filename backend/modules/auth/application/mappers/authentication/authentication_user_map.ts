

import UserDTO from "../../dto/authentication/authentication_user_dto";
import { AuthenticationUser } from "../../../domain/entities/authentication/authentication_user";

export abstract class AuthenticationUserMap {
  public static fromEntityToDTO(user:AuthenticationUser): UserDTO {
    return {
      id: user.id.value,
      email: user.email.value,
    };
  }
}
