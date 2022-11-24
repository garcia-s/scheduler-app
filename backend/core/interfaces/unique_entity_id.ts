import ValueObject from "./value_object";

export abstract class UniqueEntityID<T> extends ValueObject<T> {
    get value(): T {
        return this._value;
    }

    abstract equals(object: UniqueEntityID<T>): boolean;
}

