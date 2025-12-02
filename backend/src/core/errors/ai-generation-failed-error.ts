export class AIGenerationFailedError extends Error {
  constructor(error: unknown) {
    super(`AI generation failed: ${String(error)}`);
    this.name = "AIGenerationFailedError";
  }
}
