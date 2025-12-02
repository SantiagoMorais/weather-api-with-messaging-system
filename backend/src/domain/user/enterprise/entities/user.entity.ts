import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IUsersProps } from "src/core/interfaces/entities/users-props";
import { UserCreatedEvent } from "../events/user-created.event";
import { Optional } from "src/core/types/optional";

export class User extends AggregateRoot<IUsersProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get password() {
    return this.props.password;
  }

  static create(
    props: Optional<IUsersProps, "updatedAt" | "createdAt">,
    id?: UniqueEntityId
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    );

    const itsNewUser = !id;
    if (itsNewUser) user.addDomainEvent(new UserCreatedEvent(user));

    return user;
  }
}
