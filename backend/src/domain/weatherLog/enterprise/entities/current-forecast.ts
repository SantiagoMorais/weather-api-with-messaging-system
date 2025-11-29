import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ICurrentForecastProps } from "src/core/interfaces/entities/current-forecast-props";
import { CurrentForecastCreatedEvent } from "../events/current-forecast-created-event";

export class CurrentForecast extends AggregateRoot<ICurrentForecastProps> {
  get forecast24h() {
    return this.props.stats;
  }

  get location() {
    return this.props.location;
  }

  get collectedAt() {
    return this.props.createdAt;
  }

  get processedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Omit<ICurrentForecastProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId
  ) {
    const currentForecast = new CurrentForecast(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    const itsNewForecast = !id;
    if (itsNewForecast)
      currentForecast.addDomainEvent(
        new CurrentForecastCreatedEvent(currentForecast)
      );

    return currentForecast;
  }
}
