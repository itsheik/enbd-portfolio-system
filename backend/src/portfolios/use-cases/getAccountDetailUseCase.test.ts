import { GetAccountDetailUseCase } from "./getAccountDetailUseCase"; // Adjust the path if needed
import { ServerError } from "../../lib/ServerError";

// Mock prisma and cache
jest.mock("../../lib/prisma", () => ({
  accountDetail: {
    findFirst: jest.fn(),
  },
}));
jest.mock("../../lib/cache", () => ({
  getValue: jest.fn(),
  setValue: jest.fn(),
}));

const prisma = require("../../lib/prisma");
const cache = require("../../lib/cache");

describe("GetAccountDetailUseCase", () => {
  const useCase = new GetAccountDetailUseCase();

  const mockUserId = 1;

  const mockAccount = {
    id: 123,
    userLoginDetailId: mockUserId,
    runningBalance: "1000.00",
    userLoginDetail: {
      id: mockUserId,
      name: "John Doe",
      email: "john@example.com",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return account from cache if exists", async () => {
    cache.getValue.mockResolvedValue(mockAccount);

    const result = await useCase.execute({ userId: mockUserId });

    expect(cache.getValue).toHaveBeenCalledWith(`account:${mockUserId}`);
    expect(prisma.accountDetail.findFirst).not.toHaveBeenCalled();
    expect(result.account).toEqual(mockAccount);
  });

  it("should fetch from DB and cache it if not in cache", async () => {
    cache.getValue.mockResolvedValue(null);
    prisma.accountDetail.findFirst.mockResolvedValue(mockAccount);

    const result = await useCase.execute({ userId: mockUserId });

    expect(prisma.accountDetail.findFirst).toHaveBeenCalledWith({
      where: { userLoginDetailId: mockUserId },
      include: { userLoginDetail: true },
    });

    expect(cache.setValue).toHaveBeenCalledWith(
      `account:${mockUserId}`,
      mockAccount,
      3600
    );

    expect(result.account).toEqual(mockAccount);
  });

  it("should throw if account not found", async () => {
    cache.getValue.mockResolvedValue(null);
    prisma.accountDetail.findFirst.mockResolvedValue(null);

    await expect(useCase.execute({ userId: mockUserId })).rejects.toThrow(
      "Account not found"
    );
  });

  it("should validate that userId is a number", async () => {
    // @ts-expect-error for test purpose
    await expect(useCase.execute({ userId: "abc" })).rejects.toThrow();
  });
});
