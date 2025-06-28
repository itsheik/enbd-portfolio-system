import { Express } from "express";

export abstract class Controller {
  abstract initializeRoutes(app: Express): void;
}
