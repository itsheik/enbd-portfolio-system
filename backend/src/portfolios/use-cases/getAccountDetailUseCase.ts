import { AccountDetail, OrderDetail, UserLoginDetail } from "@prisma/client";
import { UseCase } from "../../lib/UseCase";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { ServerError } from "../../lib/ServerError";
import cache from "../../lib/cache";

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

    const cachedAccount = await cache.getValue<Output["account"]>(
      `account:${input.userId}`
    );

    if (cachedAccount) {
      return {
        account: cachedAccount,
      };
    }

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

    await cache.setValue(`account:${input.userId}`, account, 60 * 60);

    return {
      account,
    };
  }
}
