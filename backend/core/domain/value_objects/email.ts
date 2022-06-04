import ValueObject from "../../interfaces/value_object";

class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }
}
