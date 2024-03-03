-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "Carer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerPet" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "OwnerPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoHome" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "ownerPetId" UUID,
    "postingId" UUID,

    CONSTRAINT "PhotoHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerPetId" UUID NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "carerId" UUID,
    "ownerPetId" UUID,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posting" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerPetId" UUID,

    CONSTRAINT "Posting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "carerId" UUID,
    "postingId" UUID,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Carer_dni_key" ON "Carer"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Carer_userId_key" ON "Carer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerPet_dni_key" ON "OwnerPet"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerPet_userId_key" ON "OwnerPet"("userId");

-- AddForeignKey
ALTER TABLE "Carer" ADD CONSTRAINT "Carer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerPet" ADD CONSTRAINT "OwnerPet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoHome" ADD CONSTRAINT "PhotoHome_ownerPetId_fkey" FOREIGN KEY ("ownerPetId") REFERENCES "OwnerPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoHome" ADD CONSTRAINT "PhotoHome_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerPetId_fkey" FOREIGN KEY ("ownerPetId") REFERENCES "OwnerPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "Carer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ownerPetId_fkey" FOREIGN KEY ("ownerPetId") REFERENCES "OwnerPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posting" ADD CONSTRAINT "Posting_ownerPetId_fkey" FOREIGN KEY ("ownerPetId") REFERENCES "OwnerPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "Carer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
