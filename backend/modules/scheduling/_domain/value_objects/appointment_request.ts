import ValueObject from "../../../../core/interfaces/value_object";
import { Timeframe } from "./timeframe";

export type IAppointmentRequestParams = {
  timeFrame: Timeframe;
  clientId: string;
  providerId?: string;
};

export class AppointmentRequest extends ValueObject<IAppointmentRequestParams> {
  private constructor(params: IAppointmentRequestParams) {
    super(params);
  }

  create(params: IAppointmentRequestParams): AppointmentRequest {
    return new AppointmentRequest(params);
  }

  reconstitute(params: IAppointmentRequestParams): AppointmentRequest {
    return new AppointmentRequest(params);
  }

  get timeFrame(): Timeframe {
    return this._value.timeFrame;
  }

  get clientId(): string {
    return this._value.clientId;
  }

  get providerId(): string | undefined {
    return this._value.providerId;
  }
}
