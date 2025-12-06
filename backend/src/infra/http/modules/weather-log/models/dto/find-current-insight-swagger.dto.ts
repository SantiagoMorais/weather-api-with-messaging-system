import { ApiProperty } from "@nestjs/swagger";
import { ICurrentInsightWithId } from "../interfaces/current-insight-with-id";

export class FindCurrentInsightSwaggerDTO implements ICurrentInsightWithId {
  @ApiProperty({
    description:
      "AI-generated insight/analysis on the current weather conditions, focusing on daily life and safety.",
    example:
      "O clima está quente e seco, ideal para atividades externas, mas mantenha-se hidratado. Não há riscos iminentes.",
    type: "string",
    nullable: true,
    required: false,
  })
  currentInsight?: string | null;

  @ApiProperty({
    description: "The database id of this insight weather log",
  })
  id: string;
}
