import ValueObject from "../../../../core/interfaces/value_object";
import { Timeframe } from "./timeframe";

export type IAppointmentRescheduleRequestParams = {
  appointmentId: string;
  timeFrame: Timeframe;
  clientId: string;
  providerId?: string;
};

export class AppointmentRescheduleRequest extends ValueObject<IAppointmentRescheduleRequestParams> {
  private constructor(params: IAppointmentRescheduleRequestParams) {
    super(params);
  }

  create(
    params: IAppointmentRescheduleRequestParams
  ): AppointmentRescheduleRequest {
    return new AppointmentRescheduleRequest(params);
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
