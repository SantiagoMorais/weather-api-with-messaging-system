import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { WeatherLog } from "../entities/weather-log";

export class WeatherLogCreatedEvent implements DomainEvent {
  public occurredAt: Date;
  public weatherLog: WeatherLog;

  constructor(weatherLog: WeatherLog) {
    this.weatherLog = weatherLog;
    this.occurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.weatherLog.id;
  }
}
