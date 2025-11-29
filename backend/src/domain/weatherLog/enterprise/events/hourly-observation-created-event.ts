import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { HourlyObservation } from "../entities/hourly-observation";

export class HourlyObservationCreatedEvent implements DomainEvent {
  public occurredAt: Date;
  public hourlyObservation: HourlyObservation;

  constructor(hourlyObservation: HourlyObservation) {
    this.hourlyObservation = hourlyObservation;
    this.occurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.hourlyObservation.id;
  }
}
