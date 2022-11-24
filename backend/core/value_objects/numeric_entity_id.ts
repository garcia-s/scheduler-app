import { Err, Ok, Result } from "ts-results";
import Failure from "../interfaces/failure";
import { UniqueEntityID } from "../interfaces/unique_entity_id";



export class InvalidIntegerNumber extends Failure {}
export class NumericEntityID extends UniqueEntityID<number> {

    private constructor(id: number) {
        super(id);
    }

    public static create(id: number): Result<NumericEntityID, InvalidIntegerNumber> {
        if(!Number.isInteger(id)) return Err(new InvalidIntegerNumber());
        return Ok(new NumericEntityID(id))
    }

    public static reconstute(id: number): NumericEntityID {
        return new NumericEntityID(id)
    }
    
    equals(object:NumericEntityID): boolean {
        return this.value === object.value;
    }
}
