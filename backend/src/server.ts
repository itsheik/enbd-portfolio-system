import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { OrdersController } from "./orders/orders.controller";
import { ServerError } from "./lib/ServerError";
import { PortfoliosController } from "./portfolios/portfolios.controller";

class Server {
  private app: Express;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public async start() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupGlobalErrorHandler();

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes() {
    new OrdersController().initializeRoutes(this.app);
    new PortfoliosController().initializeRoutes(this.app);
  }

  private setupGlobalErrorHandler() {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.error(error);

        if (error instanceof ServerError) {
          res.status(error.statusCode).json({ message: error.message });
          return;
        }

        res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }
}

const PORT = process.env.PORT || 4000;
const server = new Server(Number(PORT));
server.start();
