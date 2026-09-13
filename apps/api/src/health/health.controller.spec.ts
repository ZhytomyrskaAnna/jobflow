import { jest } from '@jest/globals';

jest.unstable_mockModule('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('HealthController', () => {
  it('should return 200 when database is available', async () => {
    // @ts-expect-error Jest ESM test import
    const { HealthController } = await import('./health.controller.ts');

    const healthService = {
      checkDatabase: async () => true,
    };

    const controller = new HealthController(
      healthService as never,
    );

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await controller.check(response as never);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      status: 'ok',
      database: 'up',
    });
  });

  it('should return 503 when database is unavailable', async () => {
    // @ts-expect-error Jest ESM test import
    const { HealthController } = await import('./health.controller.ts');

    const healthService = {
      checkDatabase: async () => false,
    };

    const controller = new HealthController(
      healthService as never,
    );

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await controller.check(response as never);

    expect(response.status).toHaveBeenCalledWith(503);
    expect(response.json).toHaveBeenCalledWith({
      status: 'error',
      database: 'down',
    });
  });
});