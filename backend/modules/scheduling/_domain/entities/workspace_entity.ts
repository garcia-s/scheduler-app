import { Entity } from "../../../../core/interfaces/entity";




export class WorkspaceEntity extends Entity {
    private _id: string;


    get id(): string {
        return this._id;
    }
}