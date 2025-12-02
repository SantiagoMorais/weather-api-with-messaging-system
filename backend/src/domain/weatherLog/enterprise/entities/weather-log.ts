import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IWeatherLogProps } from "src/core/interfaces/entities/weather-log-props";
import { WeatherLogCreatedEvent } from "../events/weather-log-created.event";

export class WeatherLog extends AggregateRoot<IWeatherLogProps> {
  get currentForecastStats() {
    return this.props.currentForecastStats;
  }

  get hourlyObservationStats() {
    return this.props.hourlyObservationStats;
  }

  get insight() {
    return this.props.insight;
  }

  get location() {
    return this.props.location;
  }

  static create(
    props: Omit<IWeatherLogProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId
  ) {
    const weatherLog = new WeatherLog(
      {
        createdAt: new Date(),
        ...props,
      },
      id
    );

    const itsNewWeatherLog = !id;
    if (itsNewWeatherLog)
      weatherLog.addDomainEvent(new WeatherLogCreatedEvent(weatherLog));

    return weatherLog;
  }
}
