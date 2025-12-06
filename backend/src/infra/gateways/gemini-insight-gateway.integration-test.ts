import "dotenv/config";
import { Test, TestingModule } from "@nestjs/testing";
import { GeminiInsightGateway } from "./gemini-insight-gateway.service";
import { EnvService } from "../env/env.service";
import { makeWeatherLog } from "test/factories/make-weather-log";
import { IAIInsightGeneratorPayload } from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

const makeWeatherLogResponse = makeWeatherLog();
const mockPayload: IAIInsightGeneratorPayload = {
  location: {
    latitude: -19.9167, // E.g: Belo Horizonte
    longitude: -43.9333,
    timezone: "America/Sao_Paulo",
  },
  stats: {
    ...makeWeatherLogResponse.hourlyObservationStats,
    timestamp: new Date(),
    apparentTemperature: 30,
    relativeHumidity: 45,
    cloudCover: 5,
    windSpeed: 8,
    precipitationProbability: 0,
    rain: 0,
  },
  weatherLogId: new UniqueEntityId("1"),
};

describe("GeminiInsightGateway (Integration Test)", () => {
  let gateway: GeminiInsightGateway;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log(
      "Skipping Gemini Integration Tests: GEMINI_API_KEY is not set."
    );
    it.skip("Skipping Gemini Integration Tests: GEMINI_API_KEY is not set.", () => {});
    return;
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiInsightGateway,
        {
          provide: EnvService,
          useValue: {
            get: (key: string) => {
              if (key === "GEMINI_API_KEY") {
                return apiKey;
              }
              return null;
            },
          },
        },
      ],
    }).compile();

    gateway = module.get<GeminiInsightGateway>(GeminiInsightGateway);
  });

  it("should generate a non-empty insight string (successful API call)", async () => {
    const insight = await gateway.generateInsight(mockPayload);

    console.log("--- Insight Generated (Test) ---");
    console.log(insight);
    console.log("-------------------------------");

    expect(insight).toBeDefined();
    expect(typeof insight).toBe("string");
    expect(insight.length).toBeGreaterThan(50);
  });

  it("should generate an insight with 2 or 3 sentences", async () => {
    const insight = await gateway.generateInsight(mockPayload);

    const sentences = insight
      .split(/[.!?]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    expect(sentences.length).toBeGreaterThanOrEqual(2);
    expect(sentences.length).toBeLessThanOrEqual(3);
  });

  it("should contain risk alert phrases in a rainy scenario", async () => {
    const rainyPayload = {
      ...mockPayload,
      stats: {
        ...mockPayload.stats,
        cloudCover: 90,
        precipitationProbability: 95,
        rain: 5,
      },
    };

    const insight = await gateway.generateInsight(rainyPayload);

    console.log("--- Insight Generated (Test) ---");
    console.log(insight);
    console.log("-------------------------------");

    expect(insight.toLowerCase()).toEqual(
      expect.stringContaining("chuva") ||
        expect.stringContaining("risco") ||
        expect.stringContaining("alerta")
    );
  });
});
