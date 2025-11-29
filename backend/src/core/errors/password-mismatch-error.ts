export class PasswordMismatchError extends Error {
  constructor() {
    super(`Password and repeat password don't match.`);
    this.name = "PasswordMismatchError";
  }
}
