import { UniqueEntityID } from "./unique_entity_id";

export abstract class Entity {
  protected _id: UniqueEntityID<any>;

  protected constructor(id: UniqueEntityID<any>) {
    this._id = id;
  }
  
  get id(): UniqueEntityID<any> {
    return this._id;
  }

  equals(entity: Entity): boolean {
    return this.id === entity.id;
  }
}
