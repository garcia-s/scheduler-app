import ValueObject from "../../../../core/interfaces/value_object";

export class ServiceDescription extends ValueObject<string>{
    private constructor(value: string) {
        super(value);
    }
}