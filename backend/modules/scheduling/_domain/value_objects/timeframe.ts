import { Err, Ok, Result } from "ts-results";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";
import ValueObject from "../../../../core/interfaces/value_object";
import validator from "validator";

export type ITimeframeParams = {
  startDate: Date;
  endDate: Date;
};
export class Timeframe extends ValueObject<ITimeframeParams> {
  private constructor(params: ITimeframeParams) {
    super(params);
  }

  public static create(params: {
    startDate: string;
    duration: number;
  }): Result<Timeframe, DomainObjectValidationFailure> {
    if (!validator.isISO8601(params.startDate))
      return Err(new DomainObjectValidationFailure());

    if (!Number.isInteger(params.duration))
      return Err(new DomainObjectValidationFailure());

    const startDate = new Date(params.startDate);
    const endDate = new Date(startDate.getTime() + params.duration * 60000);
    return Ok(new Timeframe({ startDate, endDate }));
  }

  get duration(): number {
    return (
      (this._value.endDate.getTime() - this._value.startDate.getTime()) / 60000
    );
  }

  get startDate(): Date {
    return this._value.startDate;
  }

  get endDate(): Date {
    return this._value.endDate;
  }

  // collidesWith(timeFrame:): boolean {}
}
