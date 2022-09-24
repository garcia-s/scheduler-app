import { Err, Ok, Result } from "ts-results";
import { DomainObjectValidationFailure } from "../../../../core/failures/domain_failures";
import ValueObject from "../../../../core/interfaces/value_object";

type IFullNameParams = {
  firstName: string;
  lastName: string;
};

export class FullName extends ValueObject<IFullNameParams> {
  private constructor(params: IFullNameParams) {
    super(params);
  }

  public static create(params: {
    firstName: string;
    lastName: string;
  }): Result<FullName, DomainObjectValidationFailure> {
    if (params.firstName.length >= 2 && params.lastName.length > 2)
      return Ok(new FullName(params));
    return Err(new DomainObjectValidationFailure());
  }

  get firstName(): string {
    return this._value.firstName;
  }

  get lastName(): string {
    return this._value.lastName;
  }
}
