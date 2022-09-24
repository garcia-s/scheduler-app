import ValueObject from "../../../../core/interfaces/value_object";

export type IAppointmentRequest = {
  startTime: Date;
  endTime: Date;
  clientID: string;
  
};
class AppointmentRequest extends ValueObject<IAppointmentRequest> {

}
