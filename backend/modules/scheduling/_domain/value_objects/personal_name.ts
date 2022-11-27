import ValueObject from "../../../../core/interfaces/value_object";

export class PersonalName extends ValueObject<string> {
    private constructor(value: string) {
        super(value);
    }
}