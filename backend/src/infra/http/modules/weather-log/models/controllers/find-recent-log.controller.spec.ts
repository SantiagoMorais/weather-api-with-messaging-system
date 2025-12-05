import { Test, TestingModule } from "@nestjs/testing";
import { FindRecentLogController } from "./find-recent-log/find-recent-log.controller";

describe("FindRecentLogController", () => {
  let controller: FindRecentLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindRecentLogController],
    }).compile();

    controller = module.get<FindRecentLogController>(FindRecentLogController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
