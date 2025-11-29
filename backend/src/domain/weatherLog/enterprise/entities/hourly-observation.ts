import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IHourlyObservationProps } from "src/core/interfaces/entities/hourly-observation";
import { HourlyObservationCreatedEvent } from "../events/hourly-observation-created-event";

export class HourlyObservation extends AggregateRoot<IHourlyObservationProps> {
  get currentStats() {
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
    props: Omit<IHourlyObservationProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId
  ) {
    const hourlyObservation = new HourlyObservation(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    const itsNewForecast = !id;
    if (itsNewForecast)
      hourlyObservation.addDomainEvent(
        new HourlyObservationCreatedEvent(hourlyObservation)
      );

    return hourlyObservation;
  }
}
