
import { IDomainEvent } from "./domain_event";
import { Entity } from "./entity";
import { DomainEventEmitter } from "./domain_event_emitter";

export default abstract class Aggregate extends Entity {
  private _domainEvents: IDomainEvent[] = [];

  protected constructor(id: string) {
    super(id);
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  equals(aggregate: Aggregate ): boolean {
    return this._id === aggregate.id;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEventEmitter.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected dispatchEventsForAggregate() {
    DomainEventEmitter.dispatchEventsForAggregate(this.id);
  }
}
