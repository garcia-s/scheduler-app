import ValueObject from "../../../../core/interfaces/value_object";

export class ServiceName extends ValueObject<string> {
    private constructor(value: string) {
        super(value);
    }

    get value():string {
        return this._value
    }
    
    equals(object: ServiceName): boolean {
        return this.value === object.value;
    }
}