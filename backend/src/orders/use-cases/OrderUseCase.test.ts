import { OrderUseCase } from "./orderUseCase"; // adjust the path as needed
import { TransactionType, UserActions } from "../../lib/types";
import { ServerError } from "../../lib/ServerError";
import Decimal from "decimal.js";

// Mock prisma and cache
jest.mock("../../lib/prisma", () => ({
  accountDetail: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  orderDetail: {
    create: jest.fn(),
  },
  auditAction: {
    create: jest.fn(),
  },
  $transaction: jest.fn((fn) =>
    fn({
      orderDetail: {
        create: jest.fn(),
      },
      accountDetail: {
        update: jest.fn(),
      },
    })
  ),
}));

jest.mock("../../lib/cache", () => ({
  deleteValue: jest.fn(),
}));

const prisma = require("../../lib/prisma");
const cache = require("../../lib/cache");

describe("OrderUseCase", () => {
  const useCase = new OrderUseCase();

  const inputBuy = {
    userId: 1,
    fundName: "MyFund",
    fundValue: 100,
    quantity: 2,
    transactionType: TransactionType.Buy,
  };

  const inputSell = {
    ...inputBuy,
    transactionType: TransactionType.Sell,
  };

  const mockAccount = {
    id: 1,
    runningBalance: new Decimal(500).toString(), // assuming it's stored as string in DB
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if account not found", async () => {
    prisma.accountDetail.findFirst.mockResolvedValue(null);

    await expect(useCase.execute(inputBuy)).rejects.toThrow(
      "Account not found"
    );
  });

  it("should throw error if not enough balance for buy", async () => {
    prisma.accountDetail.findFirst.mockResolvedValue({
      ...mockAccount,
      runningBalance: new Decimal(100).toString(), // only 100, but needs 200
    });

    await expect(useCase.execute(inputBuy)).rejects.toThrow(
      "Not enough balance"
    );
  });

  it("should process a successful buy order", async () => {
    prisma.accountDetail.findFirst.mockResolvedValue(mockAccount);

    await expect(useCase.execute(inputBuy)).resolves.toBeUndefined();

    expect(prisma.$transaction).toHaveBeenCalled();
    expect(prisma.auditAction.create).toHaveBeenCalledWith({
      data: {
        userLoginDetailId: inputBuy.userId,
        userAction: UserActions.Buy,
      },
    });
    expect(cache.deleteValue).toHaveBeenCalledWith(
      `account:${inputBuy.userId}`
    );
  });

  it("should process a successful sell order", async () => {
    prisma.accountDetail.findFirst.mockResolvedValue(mockAccount);

    await expect(useCase.execute(inputSell)).resolves.toBeUndefined();

    expect(prisma.$transaction).toHaveBeenCalled();
    expect(prisma.auditAction.create).toHaveBeenCalledWith({
      data: {
        userLoginDetailId: inputSell.userId,
        userAction: UserActions.Sell,
      },
    });
    expect(cache.deleteValue).toHaveBeenCalledWith(
      `account:${inputSell.userId}`
    );
  });

  it("should validate quantity must be positive integer", async () => {
    await expect(
      useCase.execute({ ...inputBuy, quantity: 0 }) // invalid quantity
    ).rejects.toThrow();
  });
});
