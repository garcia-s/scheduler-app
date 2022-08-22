import UniqueEntityID from "../domain/value_objects/unique_entity_id";
import { IDomainEvent } from "../domain/events/domain_event";
import { Entity } from "./entity";
import { DomainEventEmitter } from "../domain/events/domain_event_emitter";

export default abstract class AggregateRoot<R extends Entity<any>> {
  private _root: R;
  private _domainEvents: IDomainEvent[] = [];

  protected constructor(root: R) {
    this._root = root;
  }

  get root(): R {
    return this._root;
  }

  get id(): UniqueEntityID {
    return this._root.id
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  equals(aggregate: AggregateRoot<any>): boolean {
    return this._root.equals(aggregate.root)
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEventEmitter.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
