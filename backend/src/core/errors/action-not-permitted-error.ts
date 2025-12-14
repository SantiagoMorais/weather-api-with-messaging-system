export class ActionNotPermittedError extends Error {
  constructor(message?: string) {
    super(message ?? `This action is not permitted`);
    this.name = "ActionNotPermittedError";
  }
}
