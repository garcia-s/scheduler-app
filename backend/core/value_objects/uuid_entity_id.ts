import { UniqueEntityID } from "../interfaces/unique_entity_id";
import {v4 as uuid} from 'uuid';
export class UUIDEntityID extends UniqueEntityID<string> {


    private constructor(uuid: string) {
        super(uuid);
    }

    public static create(id?: string): UUIDEntityID {
        return new UUIDEntityID(id ? id : uuid());
    }

    public static reconstitute(id: string) {
        return new UUIDEntityID(id);
    }

    equals(object: UUIDEntityID): boolean {
        return this.value == object.value;
    }
    
}
