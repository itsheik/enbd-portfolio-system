import { Currency } from "../../../lib/types";
import prisma from "../../../lib/prisma";
import { CreateAccountUseCase } from "../createAccountUseCase";

jest.mock("../../../lib/prisma", () => ({
  account: {
    create: jest.fn(),
  },
}));

describe("CreateAccountUseCase", () => {
  let useCase: CreateAccountUseCase;

  beforeEach(() => {
    useCase = new CreateAccountUseCase();
    jest.clearAllMocks();
  });

  it("should validate input schema and throw an error for invalid input", async () => {
    const invalidInput = {
      holderName: "", // Invalid name
      currency: Currency.USD,
    };

    await expect(useCase.execute(invalidInput)).rejects.toThrowError(
      "HolderName must be at least 3 characters long"
    );
  });

  it("should create an account successfully", async () => {
    const validInput = {
      holderName: "John Doe",
      currency: Currency.USD,
    };

    const mockAccount = {
      id: 1,
      holderName: validInput.holderName,
      currency: validInput.currency,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock the Prisma create function
    (prisma.account.create as jest.Mock).mockResolvedValue(mockAccount);

    const result = await useCase.execute(validInput);

    expect(prisma.account.create).toHaveBeenCalledWith({
      data: {
        holderName: validInput.holderName,
        currency: validInput.currency,
      },
    });
    expect(result.account).toEqual(mockAccount);
  });

  it("should handle database errors gracefully", async () => {
    const validInput = {
      holderName: "John Doe",
      currency: Currency.USD,
    };

    // Mock Prisma to throw an error
    (prisma.account.create as jest.Mock).mockRejectedValue(
      new Error("Database Error")
    );

    await expect(useCase.execute(validInput)).rejects.toThrowError(
      "Database Error"
    );

    expect(prisma.account.create).toHaveBeenCalledWith({
      data: {
        holderName: validInput.holderName,
        currency: validInput.currency,
      },
    });
  });
});
