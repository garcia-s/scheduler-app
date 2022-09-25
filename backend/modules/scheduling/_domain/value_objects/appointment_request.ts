import ValueObject from "../../../../core/interfaces/value_object";
import { Timeframe } from "./timeframe";

export type IAppointmentRequest = {
  timeFrame: Timeframe,
  clientId: string;
  providerId: string;
};

class AppointmentRequest extends ValueObject<IAppointmentRequest> {
   
}
