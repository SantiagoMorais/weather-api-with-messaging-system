import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ICurrentForecastProps } from "src/core/interfaces/entities/current-forecast-props";
import { Optional } from "src/core/types/optional";

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
    props: Optional<ICurrentForecastProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId
  ) {
    const currentForecast = new CurrentForecast(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? undefined,
      },
      id
    );

    return currentForecast;
  }
}
