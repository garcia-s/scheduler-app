import ValueObject from "../../../../core/interfaces/value_object";
type IRequestAttributeParams = {
  name: string;
  value: string;
};
export class AccessRequestAttribute extends ValueObject<IRequestAttributeParams> {
  private constructor(params: IRequestAttributeParams) {
    super(params);
  }

  public static create(
    params: IRequestAttributeParams
  ): AccessRequestAttribute {
    return new AccessRequestAttribute(params);
  }

  get name(): string {
    return this._value.name;
  }

  get value(): string {
    return this._value.value;
  }

  equals(object: AccessRequestAttribute): boolean {
    return this.value == object.value && this.name == object.name;
  }
}
