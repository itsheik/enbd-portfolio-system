import { AccountDetail, OrderDetail, UserLoginDetail } from "@prisma/client";
import { UseCase } from "../../lib/UseCase";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { ServerError } from "../../lib/ServerError";

type Input = {
  userId: number;
};

type Output = {
  account: (AccountDetail & { userLoginDetail: UserLoginDetail }) | null;
};

export class GetAccountDetailUseCase extends UseCase<Input, Output> {
  inputSchema = z.object({
    userId: z.number(),
  });

  async execute(input: Input): Promise<Output> {
    this.vaildateInput(input);

    const account = await prisma.accountDetail.findFirst({
      where: {
        userLoginDetailId: input.userId,
      },
      include: {
        userLoginDetail: true,
      },
    });

    if (!account) {
      throw ServerError.notFound("Account not found");
    }

    return {
      account,
    };
  }
}
