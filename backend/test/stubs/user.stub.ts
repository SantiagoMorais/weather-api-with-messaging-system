import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User } from "src/infra/database/mongoose/schemas/user.schema";

export const userStub = (): User => {
  const randomEmailAddress = randomUUID() + "@test.com";

  return {
    id: new UniqueEntityId(),
    createdAt: new Date(),
    email: randomEmailAddress,
    name: "John Doe",
    password: "John@123",
    roles: ["Role_User"],
  };
};
