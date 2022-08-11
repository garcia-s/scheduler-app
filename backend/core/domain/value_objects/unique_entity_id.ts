import ValueObject from "../../interfaces/value_object";
import { v4 as uuid } from "uuid";

export default class UniqueEntityID extends ValueObject<string> {
  constructor(value?: string) {
    super(value ?? uuid());
  }

  equals(value: UniqueEntityID): boolean {
    return value.value === this.value;
  }
}
