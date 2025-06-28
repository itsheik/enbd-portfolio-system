import { Controller } from "../lib/Controller";
import { Express } from "express";
import { CreateAccountUseCase } from "./use-cases/createAccountUseCase";
import { TopupAccountUseCase } from "./use-cases/topupAccountUseCase";
import { ChargeAccountUseCase } from "./use-cases/chargeAccountUseCase";

export class AccountsController implements Controller {
  private createAccountUseCase: CreateAccountUseCase;
  private topupAccountUseCase: TopupAccountUseCase;
  private chargeAccountUseCase: ChargeAccountUseCase;

  constructor() {
    this.createAccountUseCase = new CreateAccountUseCase();
    this.topupAccountUseCase = new TopupAccountUseCase();
    this.chargeAccountUseCase = new ChargeAccountUseCase();
  }

  initializeRoutes(app: Express): void {
    app.post("/accounts", async (req, res, next) => {
      try {
        const result = await this.createAccountUseCase.execute({
          currency: req.body.currency,
          holderName: req.body.holderName,
        });

        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    });

    app.patch("/accounts/:id/topup", async (req, res, next) => {
      try {
        const result = await this.topupAccountUseCase.execute({
          accountId: req.params.id,
          amount: req.body.amount,
          currency: req.body.currency,
          operationId: req.body.operationId,
        });

        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    });

    app.patch("/accounts/:id/charge", async (req, res, next) => {
      try {
        const result = await this.chargeAccountUseCase.execute({
          accountId: req.params.id,
          amount: req.body.amount,
          currency: req.body.currency,
          operationId: req.body.operationId,
        });

        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    });
  }
}
