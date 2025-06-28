import { z, ZodRawShape } from "zod";
import { ServerError } from "./ServerError";

export abstract class UseCase<Input, Output> {
  protected abstract inputSchema: z.ZodObject<ZodRawShape>;

  protected vaildateInput(input: Input) {
    const result = this.inputSchema.safeParse(input);

    if (!result.success) {
      throw ServerError.badRequest(
        result.error.errors.map((e) => e.message).join(", ")
      );
    }
  }

  abstract execute(input: Input): Promise<Output>;
}
