
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { AuditActionsController } from './auditActions.controller';

jest.mock('./use-cases/auditActions.useCase');
const { GetAuditActionsUseCase } = require('./use-cases/auditActions.useCase');

describe('AuditActionsController', () => {
    let app: express.Express;
    let mockExecute: jest.Mock;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        const controller = new AuditActionsController();
        controller.initializeRoutes(app);
        mockExecute = jest.fn();
        GetAuditActionsUseCase.mockImplementation(() => ({ execute: mockExecute }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return audit actions data', async () => {
        const mockResult = { data: [{ id: 1 }], total: 1, page: 1, pageSize: 10 };
        mockExecute.mockResolvedValue(mockResult);
        const res = await request(app).get('/audit-actions');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResult);
        expect(mockExecute).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    });

    it('should handle query params', async () => {
        const mockResult = { data: [], total: 0, page: 2, pageSize: 5 };
        mockExecute.mockResolvedValue(mockResult);
        const res = await request(app).get('/audit-actions?page=2&pageSize=5');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResult);
        expect(mockExecute).toHaveBeenCalledWith({ page: 2, pageSize: 5 });
    });

    it('should call next(error) on failure', async () => {
        mockExecute.mockRejectedValue(new Error('fail'));
        // Custom error handler to capture next(error)
        let errorCaught: Error | null = null;
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            errorCaught = err;
            res.status(500).json({ error: err.message });
        });
        const res = await request(app).get('/audit-actions');
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'fail' });
        expect(errorCaught).toBeInstanceOf(Error);
    });
});
