import { GetSummaryUseCase } from "./getSummaryUseCase";
import prisma from "../../lib/prisma";
import { UserActions } from "../../lib/types";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  orderDetail: {
    findMany: jest.fn(),
  },
  auditAction: {
    create: jest.fn(),
  },
}));

// Utility to safely cast mocked functions
const mockFn = <T>(fn: T) => fn as unknown as jest.Mock;

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe("GetSummaryUseCase", () => {
  const useCase = new GetSummaryUseCase();

  const mockOrders = [
    {
      id: 1,
      orderRefNo: "ORD123",
      createdOn: new Date("2024-01-01"),
      createdById: 1,
    },
  ];

  const inputBase = {
    userId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return orders based on userId only", async () => {
    mockFn(mockedPrisma.orderDetail.findMany).mockResolvedValue(
      mockOrders as any
    );

    const result = await useCase.execute(inputBase);

    expect(mockedPrisma.orderDetail.findMany).toHaveBeenCalledWith({
      where: {
        createdById: inputBase.userId,
      },
    });

    expect(mockedPrisma.auditAction.create).toHaveBeenCalledWith({
      data: {
        userLoginDetailId: inputBase.userId,
        userAction: UserActions.SearchSummary,
      },
    });

    expect(result.orders).toEqual(mockOrders);
  });

  it("should validate input and throw error if userId is missing", async () => {
    const invalidInput = {
      orderRefNo: "ORD123",
    };

    // @ts-expect-error for test
    await expect(useCase.execute(invalidInput)).rejects.toThrow();
  });

  it("should validate input and throw error if from is not a date", async () => {
    const invalidInput = {
      userId: 1,
      from: "not-a-date",
    };

    // @ts-expect-error for test
    await expect(useCase.execute(invalidInput)).rejects.toThrow();
  });
});
