import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding departments table...');

  await prisma.department.createMany({
    data: [
      {
        name: 'Toys',
      },
      {
        name: 'Smartphones',
      },
      {
        name: 'Computers',
      },
      {
        name: 'Books',
      },
      {
        name: 'Female Clothing',
      },
      {
        name: 'Male Clothing',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seed departments error ->', error);
    await prisma.$disconnect();
    process.exit(1);
  });
