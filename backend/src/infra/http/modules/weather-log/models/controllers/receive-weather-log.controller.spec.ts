import { Test, TestingModule } from "@nestjs/testing";
import { ReceiveWeatherLogController } from "./receive-weather-log.controller";

describe("ReceiveWeatherLogController", () => {
  let controller: ReceiveWeatherLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiveWeatherLogController],
    }).compile();

    controller = module.get<ReceiveWeatherLogController>(
      ReceiveWeatherLogController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
