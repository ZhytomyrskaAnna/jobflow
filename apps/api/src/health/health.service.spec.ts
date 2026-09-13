import { jest } from '@jest/globals';

jest.unstable_mockModule('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('HealthService', () => {
  it('should return true when database is available', async () => {
    // @ts-expect-error Jest ESM test import
    const { HealthService } = await import('./health.service.ts');

    const prisma = {
      $queryRaw: async () => [],
    };

    const service = new HealthService(prisma as never);

    await expect(service.checkDatabase()).resolves.toBe(true);
  });

  it('should return false when database is unavailable', async () => {
    // @ts-expect-error Jest ESM test import
    const { HealthService } = await import('./health.service.ts');

    const prisma = {
      $queryRaw: async () => {
        throw new Error('Database unavailable');
      },
    };

    const service = new HealthService(prisma as never);

    await expect(service.checkDatabase()).resolves.toBe(false);
  });
});