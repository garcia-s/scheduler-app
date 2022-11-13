import { Err, Ok, Result } from "ts-results";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";
import ValueObject from "../../../../core/interfaces/value_object";

export type DurationParams = {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
};



//Failures
export class Duration extends ValueObject<DurationParams> {
  private constructor(params: DurationParams) {
    super(params);
  }

  public static create(
    params: DurationParams
  ): Result<Duration, DomainObjectValidationFailure> {
    // Cant create an empty duration object
    if (
      params.milliseconds == null ||
      (params.milliseconds === 0 && params.seconds == null) ||
      (params.seconds === 0 && params.minutes == null) ||
      (params.minutes === 0 && params.hours == null) ||
      params.hours === 0
    )
      return Err(new DomainObjectValidationFailure());

    if (
      (params.milliseconds !== null && !Number.isInteger(params.milliseconds)) ||
      (params.seconds !== null && !Number.isInteger(params.seconds)) ||
      (params.milliseconds !== null && !Number.isInteger(params.milliseconds)) ||
      (params.milliseconds !== null && !Number.isInteger(params.milliseconds))
    )
      return Err(new DomainObjectValidationFailure());

    return Ok(new Duration(params));
  }

  public toMilliseconds() {}
}
