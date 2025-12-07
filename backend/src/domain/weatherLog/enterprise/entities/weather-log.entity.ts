import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IWeatherLogProps } from "src/core/interfaces/entities/weather-log-props";

import { WeatherLogCreatedEvent } from "../events/weather-log-created.event";
import { Optional } from "src/core/types/utility-types/optional";
import { IObservationStats } from "../api/observation-stats";
import { ILocation } from "../api/location";

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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set currentForecastStats(currentForecast: IObservationStats[]) {
    this.props.currentForecastStats = currentForecast;
    this.touch();
  }

  set insight(insight: string | null | undefined) {
    this.props.insight = insight;
    this.touch();
  }

  set location(location: ILocation) {
    this.props.location = location;
    this.touch();
  }

  set hourlyObservationStats(hourlyObservation: IObservationStats) {
    this.props.hourlyObservationStats = hourlyObservation;
    this.touch();
  }

  static create(
    props: Optional<IWeatherLogProps, "updatedAt" | "createdAt">,
    id?: UniqueEntityId
  ) {
    const weatherLog = new WeatherLog(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? undefined,
      },
      id
    );

    const itsNewWeatherLog = !id;
    if (itsNewWeatherLog)
      weatherLog.addDomainEvent(new WeatherLogCreatedEvent(weatherLog));

    return weatherLog;
  }
}
