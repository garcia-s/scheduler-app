import { UnimplementedError } from "../../../../core/errors/general";
import ValueObject from "../../../../core/interfaces/value_object"

export default class ServiceCode extends ValueObject<string> {
    private constructor(value: string) {
        super(value);
    }

    equals(object: ServiceCode): boolean {
        throw UnimplementedError
    }
}