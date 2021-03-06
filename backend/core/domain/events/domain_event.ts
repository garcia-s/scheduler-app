import UniqueEntityID from "../value_objects/unique_entity_id";

export abstract class IDomainEvent {
  abstract dateTimeOccurred: Date;
  abstract getAggregateId(): UniqueEntityID;
}
