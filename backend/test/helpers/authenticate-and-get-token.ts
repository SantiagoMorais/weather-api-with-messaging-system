import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import { userStub } from "test/stubs/user.stub";

export const authenticateAndGetToken = async ({
  userModel,
  jwt,
}: {
  userModel: Model<UserDocument>;
  jwt: JwtService;
}): Promise<string> => {
  const userSub = userStub();
  const user = await userModel.create({
    ...userSub,
    password: "John@123",
  });

  const accessToken = jwt.sign({ sub: user._id });

  return accessToken;
};
