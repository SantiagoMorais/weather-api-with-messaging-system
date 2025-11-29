import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IUsersProps } from "src/core/interfaces/entities/users-props";
import { User } from "src/domain/user/enterprise/entities/user";

export const makeUser = (
  override: Partial<IUsersProps>,
  id?: UniqueEntityId
) => {
  const user = User.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return user;
};
