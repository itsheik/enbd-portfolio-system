import { GetAuditActionsUseCase } from './auditActions.useCase';
import prisma from '../../lib/prisma';

jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        auditAction: {
            findMany: jest.fn(),
            count: jest.fn(),
        },
    },
}));

describe('GetAuditActionsUseCase', () => {
    let useCase: GetAuditActionsUseCase;

    beforeEach(() => {
        useCase = new GetAuditActionsUseCase();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch audit actions with provided page and pageSize', async () => {
        const mockData = [{ id: 1, action: 'login' }];
        (prisma.auditAction.findMany as jest.Mock).mockResolvedValue(mockData);
        (prisma.auditAction.count as jest.Mock).mockResolvedValue(5);

        const result = await useCase.execute({ page: 2, pageSize: 2 });

        expect(prisma.auditAction.findMany).toHaveBeenCalledWith({
            skip: 2,
            take: 2,
            orderBy: { id: 'desc' },
            include: { userLoginDetail: true },
        });

        expect(prisma.auditAction.count).toHaveBeenCalled();

        expect(result).toEqual({
            data: mockData,
            total: 5,
            page: 2,
            pageSize: 2,
        });
    });

    it('should apply default values when no input is provided', async () => {
        const mockData: { id: number; action: string }[] = [];
        (prisma.auditAction.findMany as jest.Mock).mockResolvedValue(mockData);
        (prisma.auditAction.count as jest.Mock).mockResolvedValue(0);

        const result = await useCase.execute({});

        expect(prisma.auditAction.findMany).toHaveBeenCalledWith({
            skip: 0,
            take: 10,
            orderBy: { id: 'desc' },
            include: { userLoginDetail: true },
        });

        expect(result).toEqual({
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
        });
    });

    it('should throw validation error for invalid input', async () => {
        await expect(
            useCase.execute({ page: 0, pageSize: 200 })
        ).rejects.toThrow();
    });
});
