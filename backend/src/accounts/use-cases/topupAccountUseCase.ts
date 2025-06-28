import { z } from "zod";
import { Account, Currency, TransactionType } from "../../lib/types";
import { UseCase } from "../../lib/UseCase";
import prisma from "../../lib/prisma";
import { ServerError } from "../../lib/ServerError";
import Decimal from "decimal.js";

type Input = {
  accountId: string;
  amount: number;
  currency: Currency;
  operationId: string;
};

type Output = {
  account: Account;
};

export class TopupAccountUseCase extends UseCase<Input, Output> {
  inputSchema = z.object({
    accountId: z.string(),
    amount: z.number().positive(),
    currency: z.nativeEnum(Currency),
    operationId: z.string(),
  });

  async execute(input: Input): Promise<Output> {
    this.vaildateInput(input);

    let account = await prisma.account.findUnique({
      where: {
        id: input.accountId,
      },
    });

    if (!account) {
      throw ServerError.notFound("Account not found");
    }

    if (account.currency !== input.currency) {
      throw ServerError.badRequest("Currency mismatch");
    }

    const usedOperationId = await prisma.transaction.findUnique({
      where: {
        id: input.operationId,
      },
    });

    if (usedOperationId) {
      throw ServerError.conflict("Operation id already used");
    }

    const amountDecimal = new Decimal(input.amount);

    const amount = amountDecimal.toDecimalPlaces(2).toNumber();

    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({
        data: {
          id: input.operationId,
          type: TransactionType.TOPUP,
          amount,
          currency: input.currency,
          accountId: account!.id,
          operationId: input.operationId,
        },
      });

      await tx.account.update({
        where: {
          id: input.accountId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });
    });

    account = await prisma.account.findUnique({
      where: {
        id: input.accountId,
      },
    });

    return {
      account: account!,
    };
  }
}
