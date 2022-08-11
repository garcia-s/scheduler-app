import UniqueEntityID from "../value_objects/unique_entity_id";

export abstract class IDomainEvent {
  abstract get aggregateId(): UniqueEntityID;
}
