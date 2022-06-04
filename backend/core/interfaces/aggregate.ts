import UniqueEntityID from "../domain/value_objects/unique_entity_id";
import { IDomainEvent } from "../domain/events/domain_event";
import { Entity } from "./entity";
import { DomainEventEmitter } from "../domain/events/domain_event_emitter";

export default abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEventEmitter.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
