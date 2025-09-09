import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import formbody from '@fastify/formbody';
import { z } from 'zod';
import { registerRoutes } from './routes';

const server = Fastify({ logger: true });

await server.register(cors, { origin: true, credentials: true });
await server.register(sensible);
await server.register(formbody);

server.get('/health', async () => ({ status: 'ok' }));

const UgandaPhoneSchema = z
	.string()
	.regex(/^\+256\d{9}$/);

server.post('/api/payments/initiate', async (request, reply) => {
	const bodySchema = z.object({
		amount: z.number().positive(),
		currency: z.enum(['UGX', 'USD']).default('UGX'),
		phone: UgandaPhoneSchema,
		description: z.string().optional(),
		customerName: z.string().optional()
	});
	const body = bodySchema.parse(request.body);

	return reply.code(201).send({
		id: `pay_${Date.now()}`,
		status: 'PENDING',
		provider: 'mock',
		...body
	});
});

await registerRoutes(server);

const port = Number(process.env.PORT || 4000);
server
	.listen({ port, host: '0.0.0.0' })
	.then(() => server.log.info(`API running on http://localhost:${port}`))
	.catch((err) => {
		server.log.error(err);
		process.exit(1);
	});

