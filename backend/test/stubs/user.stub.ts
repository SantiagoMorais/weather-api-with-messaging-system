import { randomUUID } from "node:crypto";
import { User } from "src/infra/database/mongoose/schemas/user.schema";

export const userStub = (): User => {
  const randomEmailAddress = randomUUID() + "@test.com";

  return {
    createdAt: new Date(),
    email: randomEmailAddress,
    name: "John Doe",
    password: "John@123",
    roles: ["Role_User"],
  };
};
