-- CreateTable
CREATE TABLE "VolleyballTeam" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "captainName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "altContactNo" TEXT,
    "category" TEXT NOT NULL,
    "transactionId" TEXT,
    "userId" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VolleyballTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasketballTeam" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "captainName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "altContactNo" TEXT,
    "category" TEXT NOT NULL,
    "transactionId" TEXT,
    "userId" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BasketballTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarromTeam" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "captainName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "altContactNo" TEXT,
    "category" TEXT NOT NULL,
    "transactionId" TEXT,
    "userId" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarromTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
