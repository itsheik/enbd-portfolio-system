import { Currency, TransactionType } from "../../../lib/types";
import { ServerError } from "../../../lib/ServerError";
import Decimal from "decimal.js";
import { TopupAccountUseCase } from "../topupAccountUseCase";
import prisma from "../../../lib/prisma";

jest.mock("../../../lib/prisma", () => ({
  account: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  transaction: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  $transaction: jest.fn(),
}));

describe("TopupAccountUseCase", () => {
  let useCase: TopupAccountUseCase;

  beforeEach(() => {
    useCase = new TopupAccountUseCase();
    jest.clearAllMocks();
  });

  const validInput = {
    accountId: "account-123",
    amount: 100.5,
    currency: Currency.USD,
    operationId: "operation-123",
  };

  it("should top up the account successfully", async () => {
    (prisma.account.findUnique as jest.Mock)
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 50,
      })
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 150.5,
      });

    (prisma.transaction.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      await callback(prisma);
    });

    const result = await useCase.execute(validInput);

    expect(result.account.balance).toBe(150.5);
    expect(prisma.transaction.create).toHaveBeenCalledWith({
      data: {
        id: validInput.operationId,
        type: TransactionType.TOPUP,
        amount: new Decimal(validInput.amount).toDecimalPlaces(2).toNumber(),
        currency: validInput.currency,
        accountId: validInput.accountId,
        operationId: validInput.operationId,
      },
    });
    expect(prisma.account.update).toHaveBeenCalledWith({
      where: { id: validInput.accountId },
      data: { balance: { increment: 100.5 } },
    });
  });

  it("should throw an error if account is not found", async () => {
    (prisma.account.findUnique as jest.Mock).mockResolvedValueOnce(null);

    await expect(useCase.execute(validInput)).rejects.toThrowError(
      ServerError.notFound("Account not found")
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });

  it("should throw an error if currency does not match account currency", async () => {
    (prisma.account.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "account-123",
      currency: Currency.SAR, // Mismatched currency
      balance: new Decimal(50),
    });

    await expect(useCase.execute(validInput)).rejects.toThrowError(
      ServerError.badRequest("Currency mismatch")
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });

  it("should throw an error if operation ID is already used", async () => {
    (prisma.account.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "account-123",
      currency: Currency.USD,
      balance: new Decimal(50),
    });

    (prisma.transaction.findUnique as jest.Mock).mockResolvedValueOnce({
      operationId: validInput.operationId,
    });

    await expect(useCase.execute(validInput)).rejects.toThrowError(
      ServerError.conflict("Operation id already used")
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });

  it("should throw an error if amount is not positive", async () => {
    const invalidInput = {
      ...validInput,
      amount: -100, // Negative amount
    };

    await expect(useCase.execute(invalidInput)).rejects.toThrowError(
      "Number must be greater than 0"
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });

  it("should round the amount to two decimal places", async () => {
    const input = {
      ...validInput,
      amount: 100.56789, // Extra decimal places
    };

    (prisma.account.findUnique as jest.Mock)
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 50,
      })
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 150.57,
      });

    (prisma.transaction.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      await callback(prisma);
    });

    const result = await useCase.execute(input);

    expect(result.account.balance).toBe(150.57);
    expect(prisma.transaction.create).toHaveBeenCalledWith({
      data: {
        id: input.operationId,
        type: TransactionType.TOPUP,
        amount: 100.57,
        currency: input.currency,
        accountId: input.accountId,
        operationId: input.operationId,
      },
    });
  });
});
