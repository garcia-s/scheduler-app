
export abstract class Entity {

  abstract get id(): any

  equals(entity: Entity): boolean {
    return this.id === entity.id;
  }
}
