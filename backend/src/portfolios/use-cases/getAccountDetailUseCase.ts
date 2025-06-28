import { AccountDetail, OrderDetail, UserLoginDetail } from "@prisma/client";
import { UseCase } from "../../lib/UseCase";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { UserActions } from "../../lib/types";

type Input = {
  userId: number;
};

type Output = {
  account: AccountDetail & { userLoginDetail: UserLoginDetail };
};

export class GetSummaryUseCase extends UseCase<Input, Output> {
  inputSchema = z.object({
    userId: z.number(),
  });

  async execute(input: Input): Promise<Output> {
    this.vaildateInput(input);

    const account = await prisma.accountDetail.findFirst({
      where: {
        userLoginDetailId: input.userId,
      },
    });

    await prisma.auditAction.create({
      data: {
        userLoginDetailId: input.userId,
        userAction: UserActions.SearchSummary,
      },
    });

    return {
      account,
    };
  }
}
