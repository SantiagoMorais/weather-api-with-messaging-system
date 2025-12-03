/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodType, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);

        throw new BadRequestException({
          message: "Validation failed",
          statusCode: 400,
          errors: validationError,
        });
      }

      throw new BadRequestException("Validation failed");
    }
  }
}
