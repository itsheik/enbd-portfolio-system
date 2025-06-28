
import { Express } from "express";
import { Controller } from "../lib/Controller";
import { LoginUseCase } from "./use-cases/loginUseCase";


export class LoginController implements Controller {
    private loginUseCase: LoginUseCase;

    constructor() {
        this.loginUseCase = new LoginUseCase();
    }

    initializeRoutes(app: Express): void {
        app.post("/login", async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const result = await this.loginUseCase.execute(email, password);
                res.status(200).json(result);
            } catch (error) {
               next(error)
            }
        });
    }
}