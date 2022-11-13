
export abstract class Entity {

  protected constructor(id: string) {
    this._id = id;
  }
  
  protected _id: string;
  get id(): string {
    return this._id;
  }

  equals(entity: Entity): boolean {
    return this.id === entity.id;
  }
}
