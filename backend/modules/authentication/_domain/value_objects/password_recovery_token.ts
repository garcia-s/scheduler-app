import { UnimplementedError } from "../../../../core/errors/general";
import ValueObject from "../../../../core/interfaces/value_object";
import crypto from "crypto";
export type IPasswordRecoveryTokenParams = {
  timestamp: Date;
  token: string;
};
export default class PasswordRecoveryToken extends ValueObject<IPasswordRecoveryTokenParams> {
  private constructor(params: IPasswordRecoveryTokenParams) {
    super(params);
  }
  public static create(): PasswordRecoveryToken {
    const token = crypto.randomBytes(32).toString();
  }
  equals(): boolean {
    throw UnimplementedError;
  }
}
