import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { UserDocument } from "src/infra/database/mongoose/schemas/user.schema";
import { userStub } from "test/stubs/user.stub";

export const authenticateAndGetToken = async ({
  userModal,
  jwt,
}: {
  userModal: Model<UserDocument>;
  jwt: JwtService;
}): Promise<string> => {
  const userSub = userStub();
  const user = await userModal.create({
    ...userSub,
    password: "John@123",
  });

  const accessToken = jwt.sign({ sub: user._id });

  console.log("AccessToken from authenticateAndGetToken: \n", accessToken);

  return accessToken;
};
