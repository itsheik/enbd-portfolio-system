import { Controller } from "../lib/Controller";
import { Express } from "express";
import { OrderUseCase } from "./use-cases/orderUseCase";

export class OrdersController implements Controller {
  private orderUseCase: OrderUseCase;

  constructor() {
    this.orderUseCase = new OrderUseCase();
  }

  initializeRoutes(app: Express): void {
    app.post("/orders", async (req, res, next) => {
      try {
        const result = await this.orderUseCase.execute({
          userId: res.locals.user.id,
          fundName: req.body.fundName,
          fundValue: req.body.fundValue,
          quantity: req.body.quantity,
          transactionType: req.body.transactionType,
        });

        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    });
  }
}
