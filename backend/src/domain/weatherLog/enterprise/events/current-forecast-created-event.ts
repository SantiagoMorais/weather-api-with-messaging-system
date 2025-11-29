import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { CurrentForecast } from "../entities/current-forecast";

export class CurrentForecastCreatedEvent implements DomainEvent {
  public occurredAt: Date;
  public currentForecast: CurrentForecast;

  constructor(currentForecast: CurrentForecast) {
    this.currentForecast = currentForecast;
    this.occurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.currentForecast.id;
  }
}
