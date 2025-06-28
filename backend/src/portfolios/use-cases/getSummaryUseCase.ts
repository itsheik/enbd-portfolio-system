import { OrderDetail } from "@prisma/client";
import { UseCase } from "../../lib/UseCase";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { UserActions } from "../../lib/types";

type Input = {
  orderRefNo?: string;
  userId: number;
  from?: Date;
  to?: Date;
};

type Output = {
  orders: OrderDetail[];
};

export class GetSummaryUseCase extends UseCase<Input, Output> {
  inputSchema = z.object({
    userId: z.number(),
    orderRefNo: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional(),
  });

  async execute(input: Input): Promise<Output> {
    this.vaildateInput(input);

    const orders = await prisma.orderDetail.findMany({
      where: {
        ...(input.orderRefNo ? { orderRefNo: input.orderRefNo } : {}),
        ...(input.from ? { createdOn: { gte: input.from } } : {}),
        ...(input.to ? { createdOn: { lte: input.to } } : {}),
        createdById: input.userId,
      },
    });

    await prisma.auditAction.create({
      data: {
        userLoginDetailId: input.userId,
        userAction: UserActions.SearchSummary,
      },
    });

    return {
      orders,
    };
  }
}
