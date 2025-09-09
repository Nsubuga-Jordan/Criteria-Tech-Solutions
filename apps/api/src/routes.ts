import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const UgandaPhoneSchema = z.string().regex(/^\+256\d{9}$/);

export async function registerRoutes(app: FastifyInstance) {
  app.get('/api/customers', async () => {
    return prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
  });

  app.post('/api/customers', async (req, reply) => {
    const body = z
      .object({
        name: z.string().min(1),
        phone: UgandaPhoneSchema,
        email: z.string().email().optional()
      })
      .parse(req.body);
    const created = await prisma.customer.create({ data: body });
    return reply.code(201).send(created);
  });

  app.get('/api/payments', async () => {
    return prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: true }
    });
  });
}

