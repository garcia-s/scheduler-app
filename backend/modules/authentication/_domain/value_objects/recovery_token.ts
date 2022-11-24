import ValueObject from "../../../../core/interfaces/value_object";
import crypto from "crypto";
export type IRecoveryTokenParams = {
  token: string;
  timestamp: Date;
};
export class RecoveryToken extends ValueObject<IRecoveryTokenParams> {
  private constructor(params: IRecoveryTokenParams) {
    super(params);
  }

  public static create(): RecoveryToken {
    const token = crypto.randomInt(100001, 999999).toString();
    const timestamp = new Date();
    return new RecoveryToken({ token, timestamp });
  }

  public static reconstitute(params: { token: string; timestamp: string }) {
    const timestamp = new Date(params.timestamp);
    return new RecoveryToken({ token: params.token, timestamp });
  }

  get timestamp(): Date {
    return this._value.timestamp
  }

  get token(): string {
    return this._value.token
  }
}
