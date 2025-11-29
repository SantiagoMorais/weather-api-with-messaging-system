export class DataAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message ?? `Data already exists.`);
    this.name = "DataAlreadyExistsError";
  }
}
