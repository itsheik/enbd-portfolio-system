import { Currency, TransactionType } from "../../../lib/types";
import { ServerError } from "../../../lib/ServerError";
import Decimal from "decimal.js";
import { ChargeAccountUseCase } from "../chargeAccountUseCase";
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

describe("ChargeAccountUseCase", () => {
  let useCase: ChargeAccountUseCase;

  beforeEach(() => {
    useCase = new ChargeAccountUseCase();
    jest.clearAllMocks();
  });

  const validInput = {
    accountId: "account-123",
    amount: 50.75,
    currency: Currency.USD,
    operationId: "operation-123",
  };

  it("should charge the account successfully", async () => {
    (prisma.account.findUnique as jest.Mock)
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 100.0,
      })
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 49.25, // After charge
      });

    (prisma.transaction.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      await callback(prisma);
    });

    const result = await useCase.execute(validInput);

    expect(result.account.balance).toBe(49.25);
    expect(prisma.transaction.create).toHaveBeenCalledWith({
      data: {
        id: validInput.operationId,
        type: TransactionType.CHARGE,
        amount: new Decimal(validInput.amount).toDecimalPlaces(2).toNumber(),
        currency: validInput.currency,
        accountId: validInput.accountId,
        operationId: validInput.operationId,
      },
    });
    expect(prisma.account.update).toHaveBeenCalledWith({
      where: { id: validInput.accountId },
      data: { balance: { decrement: 50.75 } },
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
      balance: 100,
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
      balance: 100,
    });

    (prisma.transaction.findUnique as jest.Mock).mockResolvedValueOnce({
      operationId: validInput.operationId,
    });

    await expect(useCase.execute(validInput)).rejects.toThrowError(
      ServerError.conflict("Operation id already used")
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });

  it("should throw an error if not enough balance", async () => {
    (prisma.account.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "account-123",
      currency: Currency.USD,
      balance: 30, // Insufficient balance
    });

    await expect(useCase.execute(validInput)).rejects.toThrowError(
      ServerError.badRequest("Not enough balance")
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });

  it("should round the amount to two decimal places", async () => {
    const input = {
      ...validInput,
      amount: 50.7589, // Extra decimal places
    };

    (prisma.account.findUnique as jest.Mock)
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 100,
      })
      .mockResolvedValueOnce({
        id: "account-123",
        currency: Currency.USD,
        balance: 49.24, // After charge (rounded to 2 decimal places)
      });

    (prisma.transaction.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      await callback(prisma);
    });

    const result = await useCase.execute(input);

    expect(result.account.balance).toBe(49.24);
    expect(prisma.transaction.create).toHaveBeenCalledWith({
      data: {
        id: input.operationId,
        type: TransactionType.CHARGE,
        amount: 50.76, // Rounded
        currency: input.currency,
        accountId: input.accountId,
        operationId: input.operationId,
      },
    });
  });

  it("should throw an error if amount is not positive", async () => {
    const invalidInput = {
      ...validInput,
      amount: -50, // Negative amount
    };

    await expect(useCase.execute(invalidInput)).rejects.toThrowError(
      "Number must be greater than 0"
    );

    expect(prisma.account.update).not.toHaveBeenCalled();
  });
});
