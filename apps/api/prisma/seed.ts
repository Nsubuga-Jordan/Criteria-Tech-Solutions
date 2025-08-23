import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const john = await prisma.customer.upsert({
    where: { phone: '+256700000001' },
    update: {},
    create: { name: 'John Doe', phone: '+256700000001', email: 'john@example.com' }
  });

  await prisma.payment.createMany({
    data: [
      { amount: 150000, currency: 'UGX', status: 'SUCCESS', provider: 'mock', description: 'Wallet top-up', customerId: john.id },
      { amount: 50000, currency: 'UGX', status: 'PENDING', provider: 'mock', description: 'Data bundle', customerId: john.id }
    ]
  });

  console.log('Seeded');
}

main().finally(async () => {
  await prisma.$disconnect();
});

