import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const userDetail = await prisma.userDetail.create({
    data: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      emailAddress: "john.doe@example.com",
      createdOn: new Date(),
      createdBy: "system",
      modifiedOn: new Date(),
      modifiedBy: "system",
    },
  });

  const userLoginDetail = await prisma.userLoginDetail.create({
    data: {
      id: 1,
      userDetailId: userDetail.id,
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      emailAddress: userDetail.emailAddress,
      userStatus: "ACTIVE",
      createdOn: new Date(),
      createdBy: "system",
      modifiedOn: new Date(),
      modifiedBy: "system",
    },
  });

  await prisma.accountDetail.create({
    data: {
      userLoginDetailId: userLoginDetail.id,
      credit: 0,
      debit: 0,
      runningBalance: 10000,
      createdOn: new Date(),
      createdById: userLoginDetail.id!,
    },
  });
}

main()
  .catch((e) => {
    console.error("Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
