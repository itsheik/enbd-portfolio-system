import { Controller } from "../lib/Controller";
import { Express, Request, Response, NextFunction } from "express";
import { GetAuditActionsUseCase } from "./use-cases/auditActions.useCase";

export class AuditActionsController implements Controller {
    private getAuditActionsUseCase: GetAuditActionsUseCase;

    constructor() {
        this.getAuditActionsUseCase = new GetAuditActionsUseCase();
    }

    initializeRoutes(app: Express): void {
        app.get("/audit-actions", this.getAuditActions.bind(this));
    }

    async getAuditActions(req: Request, res: Response, next: NextFunction) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10;
            const userLoginDetailId = req.query.userLoginDetailId ? parseInt(req.query.userLoginDetailId as string, 10) : undefined;
            const userAction = req.query.userAction ? (req.query.userAction as string) : undefined;
            const START_DATE_TIME = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
            const END_DATE_TIME = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
            const result = await this.getAuditActionsUseCase.execute({ page, pageSize, userLoginDetailId, userAction, START_DATE_TIME, END_DATE_TIME });

            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}