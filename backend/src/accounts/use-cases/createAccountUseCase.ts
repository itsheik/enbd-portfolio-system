import { z } from "zod";
import { Account, Currency } from "../../lib/types";
import { UseCase } from "../../lib/UseCase";
import prisma from "../../lib/prisma";

type Input = {
  holderName: string;
  currency: Currency;
};

type Output = {
  account: Account;
};

export class CreateAccountUseCase extends UseCase<Input, Output> {
  inputSchema = z.object({
    holderName: z
      .string({ required_error: "HolderName is required" })
      .min(3, "HolderName must be at least 3 characters long"),
    currency: z.nativeEnum(Currency, {
      required_error: "Currency is required",
    }),
  });

  public async execute(input: Input): Promise<Output> {
    this.vaildateInput(input);

    const account = await prisma.account.create({
      data: {
        holderName: input.holderName,
        currency: input.currency,
      },
    });

    return {
      account,
    };
  }
}
