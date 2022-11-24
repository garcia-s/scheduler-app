import ValueObject from "../../../../core/interfaces/value_object";

export class GroupName extends ValueObject<string> {
    
    equals(object:GroupName): boolean {
        return this.value === object.value;
    }

    get value(): string  {
        return this._value;
    }
}