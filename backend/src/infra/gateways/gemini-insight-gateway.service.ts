import { GenerateContentParameters, GoogleGenAI } from "@google/genai";
import { Injectable } from "@nestjs/common";
import { ILocation } from "src/core/interfaces/location";
import {
  AIInsightGenerator,
  IAIInsightGeneratorPayload,
} from "src/domain/weatherLog/application/services/ai-insight-generator.service";
import { EnvService } from "../env/env.service";

const MAX_RETRIES = 3;

@Injectable()
export class GeminiInsightGateway implements AIInsightGenerator {
  private ai: GoogleGenAI;

  constructor(private config: EnvService) {
    const apiKey = this.config.get("GEMINI_API_KEY");
    this.ai = new GoogleGenAI({ apiKey });
  }

  private buildSystemPrompt(location: ILocation): string {
    const coords = `Lat: ${location.latitude}, Lon: ${location.longitude}`;
    return `Você é um Analista Meteorológico Sênior focado em riscos e otimização de energia solar fotovoltaica na coordenada ${coords} (Timezone: ${location.timezone}).
    
    Sua tarefa é analisar os dados de observação fornecidos e gerar um **insight acionável e conciso** (máximo 3 frases) focado no impacto na produção de energia solar e segurança.
    
    **REGRAS DE RESPOSTA:**
    1. O insight deve ter entre 2 e 3 frases.
    2. Destaque o potencial de geração (bom ou ruim) e **avise sobre riscos** (chuva, vento forte ou baixa visibilidade).
    3. Seja profissional, mas com tom de alerta/recomendação.`;
  }

  private buildUserPrompt(payload: IAIInsightGeneratorPayload): string {
    const stats = payload.stats;
    const timestamp = stats.timestamp.toLocaleString("pt-BR", {
      timeZone: payload.location.timezone,
    });

    return `
    Dados de Observação Climática Atual:
    - Hora da Coleta: ${timestamp}
    - Temperatura Ambiente (Aparente): ${stats.apparentTemperature}°C
    - Umidade Relativa: ${stats.relativeHumidity}%
    - Cobertura de Nuvens: ${stats.cloudCover}%
    - Velocidade do Vento: ${stats.windSpeed} km/h
    - Probabilidade de Chuva: ${stats.precipitationProbability}%
    - Chuva (última hora): ${stats.rain} mm
    
    Gere o insight conforme as instruções do sistema.`;
  }

  async generateInsight(payload: IAIInsightGeneratorPayload): Promise<string> {
    const { location } = payload;
    const userQuery = this.buildUserPrompt(payload);
    const systemPrompt = this.buildSystemPrompt(location);

    const apiPayload: GenerateContentParameters = {
      contents: [{ parts: [{ text: userQuery }], role: "user" }],
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        temperature: 0.1,
      },
    };

    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      try {
        const response = await this.ai.models.generateContent(apiPayload);
        const text = response.text;

        if (text) return text.trim();
        throw new Error(
          "IA response is empty. Possible block or generation error."
        );
      } catch (error) {
        attempt++;

        if (attempt >= MAX_RETRIES) {
          throw new Error(
            `IA service is not available or network error after ${MAX_RETRIES} attempts: ${error}`
          );
        }

        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
    return "Erro desconhecido ao se comunicar com a API da IA";
  }
}
