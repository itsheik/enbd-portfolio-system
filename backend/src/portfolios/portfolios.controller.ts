import { Controller } from "../lib/Controller";
import { Express } from "express";
import { GetSummaryUseCase } from "./use-cases/getSummaryUseCase";
import { GetAccountDetailUseCase } from "./use-cases/getAccountDetailUseCase";

export class PortfoliosController implements Controller {
  private getSummaryUseCase: GetSummaryUseCase;
  private getAccountDetailUseCase: GetAccountDetailUseCase;

  constructor() {
    this.getSummaryUseCase = new GetSummaryUseCase();
    this.getAccountDetailUseCase = new GetAccountDetailUseCase();
  }

  initializeRoutes(app: Express): void {
    app.get("/transactions", async (req, res, next) => {
      try {
        const result = await this.getSummaryUseCase.execute({
          userId: res.locals.user.id,
          orderRefNo: req.query.orderRefNo as string,
          from: req.query.from ? new Date(req.query.from as string) : undefined,
          to: req.query.to ? new Date(req.query.to as string) : undefined,
        });

        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    });

    app.get("/account", async (req, res, next) => {
      try {
        const result = await this.getAccountDetailUseCase.execute({
          userId: res.locals.user.id,
        });

        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    });
  }
}
