
export abstract class IDomainEvent {
  abstract get aggregateId(): string;
}
