-- CreateTable
CREATE TABLE "USER_DETAIL" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "emailAddress" TEXT,
    "createdOn" TIMESTAMP(3),
    "createdBy" TEXT,
    "modifiedOn" TIMESTAMP(3),
    "modifiedBy" TEXT,

    CONSTRAINT "USER_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_LOGIN_DETAIL" (
    "id" SERIAL NOT NULL,
    "userDetailId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "emailAddress" TEXT,
    "userStatus" TEXT,
    "createdOn" TIMESTAMP(3),
    "createdBy" TEXT,
    "modifiedOn" TIMESTAMP(3),
    "modifiedBy" TEXT,

    CONSTRAINT "USER_LOGIN_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ORDER_DETAIL" (
    "id" SERIAL NOT NULL,
    "securityDetailId" INTEGER NOT NULL,
    "orderRefNo" TEXT,
    "orderStatus" TEXT,
    "transactionType" TEXT NOT NULL,
    "orderValue" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3),
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "ORDER_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ACCOUNT_DETAIL" (
    "id" SERIAL NOT NULL,
    "userLoginDetailId" INTEGER NOT NULL,
    "credit" INTEGER,
    "debit" INTEGER,
    "runningBalance" INTEGER NOT NULL DEFAULT 10000,
    "orderDetailId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3),
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "ACCOUNT_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SECURITY_DETAIL" (
    "id" SERIAL NOT NULL,
    "securityName" INTEGER NOT NULL,
    "value" INTEGER,

    CONSTRAINT "SECURITY_DETAIL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AUDIT_USER_LOGIN" (
    "id" SERIAL NOT NULL,
    "userLoginDetailId" INTEGER NOT NULL,
    "sessionId" TEXT,
    "loginStatus" TEXT,
    "loginDateTime" TIMESTAMP(3),
    "logoutDateTime" TIMESTAMP(3),

    CONSTRAINT "AUDIT_USER_LOGIN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AUDIT_ACTION" (
    "id" SERIAL NOT NULL,
    "userLoginDetailId" INTEGER NOT NULL,
    "userAction" TEXT,
    "startDateTime" TIMESTAMP(3),
    "endDateTime" TIMESTAMP(3),

    CONSTRAINT "AUDIT_ACTION_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "USER_LOGIN_DETAIL" ADD CONSTRAINT "USER_LOGIN_DETAIL_userDetailId_fkey" FOREIGN KEY ("userDetailId") REFERENCES "USER_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDER_DETAIL" ADD CONSTRAINT "ORDER_DETAIL_securityDetailId_fkey" FOREIGN KEY ("securityDetailId") REFERENCES "SECURITY_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ORDER_DETAIL" ADD CONSTRAINT "ORDER_DETAIL_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "USER_LOGIN_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ACCOUNT_DETAIL" ADD CONSTRAINT "ACCOUNT_DETAIL_userLoginDetailId_fkey" FOREIGN KEY ("userLoginDetailId") REFERENCES "USER_LOGIN_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ACCOUNT_DETAIL" ADD CONSTRAINT "ACCOUNT_DETAIL_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "ORDER_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ACCOUNT_DETAIL" ADD CONSTRAINT "ACCOUNT_DETAIL_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "USER_LOGIN_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AUDIT_USER_LOGIN" ADD CONSTRAINT "AUDIT_USER_LOGIN_userLoginDetailId_fkey" FOREIGN KEY ("userLoginDetailId") REFERENCES "USER_LOGIN_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AUDIT_ACTION" ADD CONSTRAINT "AUDIT_ACTION_userLoginDetailId_fkey" FOREIGN KEY ("userLoginDetailId") REFERENCES "USER_LOGIN_DETAIL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
