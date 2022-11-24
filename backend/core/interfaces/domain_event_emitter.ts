import Aggregate from "./aggregate";
import { IDomainEvent } from "./domain_event";
import { UniqueEntityID } from "./unique_entity_id";

class Map<T> implements Object {
  [key: string]: T;
}

type DomainEventHandler<T extends IDomainEvent> = (event: T) => void;

export class DomainEventEmitter {
  private static handlersMap: Map<DomainEventHandler<any>[]> = {};
  private static markedAggregates: Aggregate[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch(aggregate: Aggregate): void {
    const aggregateFound = this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * @method dispatchAggregateEvents
   * @static
   * @private
   * @desc Call all of the handlers for any domain events on this aggregate.
   */

  private static dispatchAggregateEvents(aggregate: Aggregate): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event)
    );
  }

  /**
   * @method removeAggregateFromMarkedDispatchList
   * @static
   * @desc Removes an aggregate from the marked list.
   */

  private static removeAggregateFromMarkedDispatchList(
    aggregate: Aggregate
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));

    this.markedAggregates.splice(index, 1);
  }

  /**
   * @method findMarkedAggregateByID
   * @static
   * @desc Finds an aggregate within the list of marked aggregates.
   */

  private static findMarkedAggregateByID(
    id: UniqueEntityID<any>
  ): Aggregate | null {
    let found: Aggregate | null = null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  /**
   * @method dispatchEventsForAggregate
   * @static
   * @desc When all we know is the ID of the aggregate, call this
   * in order to dispatch any handlers subscribed to events on the
   * aggregate.
   */

  public static dispatchEventsForAggregate(id: UniqueEntityID<any>): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  /**
   * @method listen
   * @static
   * @desc Register a handler to a domain event.
   */

  public static listen<T extends IDomainEvent>(
    eventType: string,
    handler: DomainEventHandler<T>
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventType)) {
      this.handlersMap[eventType] = [];
    }
    this.handlersMap[eventType].push(handler);
  }

  /**
   * @method clearHandlers
   * @static
   * @desc Useful for testing.
   */

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  /**
   * @method clearMarkedAggregates
   * @static
   * @desc Useful for testing.
   */

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  /**
   * @method dispatch
   * @static
   * @desc Invokes all of the subscribers to a particular domain event.
   */

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}
