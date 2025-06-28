import { z } from "zod";
import { TransactionType, UserActions } from "../../lib/types";
import { UseCase } from "../../lib/UseCase";
import prisma from "../../lib/prisma";
import { ServerError } from "../../lib/ServerError";
import Decimal from "decimal.js";
import { AccountDetail } from "@prisma/client";
import cache from "../../lib/cache";

type Input = {
  userId: number;
  fundName: string;
  fundValue: number;
  quantity: number;
  transactionType: TransactionType;
};

type Output = void;

export class OrderUseCase extends UseCase<Input, Output> {
  inputSchema = z.object({
    userId: z.number(),
    fundName: z.string(),
    fundValue: z.number(),
    quantity: z.number().positive().int(),
    transactionType: z.nativeEnum(TransactionType),
  });

  private async buyOrder(input: Input, account: AccountDetail): Promise<void> {
    const balanceDecimal = new Decimal(account.runningBalance);
    const amountDecimal = new Decimal(input.quantity).mul(
      new Decimal(input.fundValue)
    );

    if (amountDecimal.gt(balanceDecimal)) {
      throw ServerError.badRequest("Not enough balance");
    }

    const amount = amountDecimal.toDecimalPlaces(2).toNumber();

    await prisma.$transaction(async (tx) => {
      await tx.orderDetail.create({
        data: {
          transactionType: input.transactionType,
          orderValue: amount,
          createdById: input.userId,
        },
      });

      await tx.accountDetail.update({
        where: {
          id: input.userId,
        },
        data: {
          runningBalance: {
            decrement: amount,
          },
        },
      });
    });

    await prisma.auditAction.create({
      data: {
        userLoginDetailId: input.userId,
        userAction: UserActions.Buy,
      },
    });
  }

  private async sellOrder(input: Input, account: AccountDetail): Promise<void> {
    const amountDecimal = new Decimal(input.fundValue).mul(
      new Decimal(input.quantity)
    );

    const amount = amountDecimal.toDecimalPlaces(2).toNumber();

    await prisma.$transaction(async (tx) => {
      await tx.orderDetail.create({
        data: {
          transactionType: input.transactionType,
          orderValue: amount,
          createdById: input.userId,
        },
      });

      await tx.accountDetail.update({
        where: {
          id: input.userId,
        },
        data: {
          runningBalance: {
            increment: amount,
          },
        },
      });
    });

    await prisma.auditAction.create({
      data: {
        userLoginDetailId: input.userId,
        userAction: UserActions.Sell,
      },
    });
  }

  async execute(input: Input): Promise<Output> {
    this.vaildateInput(input);

    let account = await prisma.accountDetail.findFirst({
      where: {
        userLoginDetailId: input.userId,
      },
    });

    await cache.deleteValue(`account:${input.userId}`);

    if (!account) {
      throw ServerError.notFound("Account not found");
    }

    if (input.transactionType === TransactionType.Buy) {
      return this.buyOrder(input, account);
    }

    if (input.transactionType === TransactionType.Sell) {
      return this.sellOrder(input, account);
    }
  }
}
