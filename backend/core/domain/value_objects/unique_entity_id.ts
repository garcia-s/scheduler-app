import ValueObject from "../../interfaces/value_object";
import { v4 as uuid } from "uuid";

export default class UniqueEntityID extends ValueObject<string> {
  constructor() {
    super(uuid());
  }
}


