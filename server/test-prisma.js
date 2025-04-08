import { PrismaClient } from "@prisma/client";

// This is a test file for Prisma Client.
// This will return all users for Prisma Client.
// It is not a test file for Google APIs.
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany(); // Fetch all users
  console.log("Users:", users);
}

main()
  .catch((e) => {
    console.error("Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });