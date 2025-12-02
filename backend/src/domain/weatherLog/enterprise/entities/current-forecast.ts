import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ICurrentForecastProps } from "src/core/interfaces/entities/current-forecast-props";

export class CurrentForecast extends Entity<ICurrentForecastProps> {
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

    return currentForecast;
  }
}
