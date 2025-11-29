import { AggregateRoot } from "src/core/entities/aggregate-root";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IUsersProps } from "src/core/interfaces/entities/users-props";

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

  static create(props: IUsersProps, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id
    );

    return user;
  }
}
