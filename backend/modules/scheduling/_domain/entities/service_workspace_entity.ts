import { Entity } from "../../../../core/interfaces/entity";

export class Workspace extends Entity {
    private _id: string;
    private _name: string;

    get id(): string {
        return this._id; 
    }
}