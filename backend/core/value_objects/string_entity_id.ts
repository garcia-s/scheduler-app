import { Err, Ok, Result } from "ts-results";
import Failure from "../interfaces/failure";
import { UniqueEntityID } from "../interfaces/unique_entity_id";


export class InvalidStringID extends Failure {}

export class StringEntityID extends UniqueEntityID<string> {
    
    private constructor(id: string) {
        super(id);
    }

    public static create(id: string): Result<StringEntityID, InvalidStringID> {
        if(id == "") return Err(new InvalidStringID);
        return Ok(new StringEntityID(id))
    }

    public static reconstitute(id: string): StringEntityID {
        return new StringEntityID(id)
    }

    equals(object:StringEntityID): boolean {
        return this.value ==  object.value;
    }
}