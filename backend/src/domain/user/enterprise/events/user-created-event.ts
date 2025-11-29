import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { User } from "../entities/user";

export class UserCreatedEvent implements DomainEvent {
  public occurredAt: Date;
  public user: User;

  constructor(user: User) {
    this.user = user;
    this.occurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.user.id;
  }
}
