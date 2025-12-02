import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IHourlyObservationProps } from "src/core/interfaces/entities/hourly-observation";

export class HourlyObservation extends Entity<IHourlyObservationProps> {
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

    return hourlyObservation;
  }
}
