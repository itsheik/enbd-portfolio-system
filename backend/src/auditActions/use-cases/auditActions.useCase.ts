
import { z } from "zod";
import { UseCase } from "../../lib/UseCase";
import prisma from "../../lib/prisma";
import { ServerError } from "../../lib/ServerError";

type Input = {
    page?: number;
    pageSize?: number;
};

type Output = {
    data: any[];
    total: number;
    page: number;
    pageSize: number;
};

export class GetAuditActionsUseCase extends UseCase<Input, Output> {
    inputSchema = z.object({
        page: z.number().int().min(1).optional().default(1),
        pageSize: z.number().int().min(1).max(100).optional().default(10),
    });

    async execute(input: Input): Promise<Output> {
        this.vaildateInput(input);
        const page = input.page ?? 1;
        const pageSize = input.pageSize ?? 10;
        const skip = (page - 1) * pageSize;

        const [data, total] = await Promise.all([
            prisma.auditAction.findMany({
                skip,
                take: pageSize,
                orderBy: { id: "desc" },
                include: { userLoginDetail: true },
            }),
            prisma.auditAction.count(),
        ]);

        return {
            data,
            total,
            page,
            pageSize,
        };
    }
}
