import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function seedHumanInformations() {
  for (let i = 0; i < 10; i++) {
    await prisma.humanInformations.create({
      data: {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
      },
    });
  }
}

async function seedAuthors() {
  const humans = await prisma.humanInformations.findMany();
  for (const human of humans) {
    await prisma.authors.create({
      data: {
        humanInformation_uuid: human.UUID,
      },
    });
  }
}

async function seedBooks() {
  const authors = await prisma.authors.findMany();
  for (const author of authors) {
    await prisma.books.create({
      data: {
        name: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        author_uuid: author.UUID,
      },
    });
  }
}

async function main() {
  await seedHumanInformations();
  await seedAuthors();
  await seedBooks();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
