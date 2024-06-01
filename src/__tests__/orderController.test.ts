import { Request, Response } from 'express';
import * as orderController from '../controllers/orderController';
import { AppDataSource } from '../config/database';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { Seed } from '../models/Seed';
import { Fertilizer } from '../models/Fertilizer';

jest.mock('../config/database');

describe('Order Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getOrders', () => {
        it('should get orders', async () => {
            const mockUser: User = {
                id: 1,
                email: 'test@gmail.com',
                role: 'customer',
                password: 'password123',
                orders: [],
            };
            const mockOrders = [
                {
                    id: 1,
                    user: mockUser,
                    seed: { id: 1, name: 'Test Seed', quantity: 10, price: 5 },
                    fertilizer: { id: 1, name: 'Test Fertilizer', quantity: 5, price: 10 },
                    quantity_seed: 2,
                    quantity_fertilizer: 1,
                },
            ];

            (AppDataSource.getRepository as jest.Mock).mockReturnValueOnce({
                createQueryBuilder: jest.fn().mockReturnValueOnce({
                    leftJoinAndSelect: jest.fn().mockReturnThis(),
                    where: jest.fn().mockReturnThis(),
                    orderBy: jest.fn().mockReturnThis(),
                    skip: jest.fn().mockReturnThis(),
                    take: jest.fn().mockReturnThis(),
                    getManyAndCount: jest.fn().mockResolvedValueOnce([mockOrders, mockOrders.length]),
                }),
            });

            mockRequest = {
                user: mockUser,
                query: {
                    page: '1',
                    pageSize: '5',
                    sort: 'asc',
                },
            };

            await orderController.getOrders(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledWith({
                data: mockOrders,
                total: mockOrders.length,
                page: 1,
                pageSize: 5,
            });
        });
    });
});
