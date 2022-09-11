
import { IDomainEvent } from "./domain_event";
import { Entity } from "./entity";
import { DomainEventEmitter } from "./domain_event_emitter";

export default abstract class Aggregate<R extends Entity> {
  private _root: R;
  private _domainEvents: IDomainEvent[] = [];

  protected constructor(root: R) {
    this._root = root;
  }

  get root(): R {
    return this._root;
  }

  get id(): string {
    return this._root.id
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  equals(aggregate: Aggregate<any>): boolean {
    return this._root.equals(aggregate.root)
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEventEmitter.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected dispatchEventForAggregate() {
    DomainEventEmitter.dispatchEventsForAggregate(this.root.id);
  }
}
