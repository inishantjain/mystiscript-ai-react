import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function main() {
  // const post = await prisma.post.deleteMany({});
  // const users = await prisma.user.deleteMany({});
  // const allUsers = await prisma.user.findMany();
  // ... WRITE HERE ALL YOUR QUERIES
}
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
