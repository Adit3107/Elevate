
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Verifying all Volleyball Teams...');
    const v = await prisma.volleyballTeam.updateMany({
        data: { isVerified: true }
    });
    console.log(`Updated ${v.count} volleyball teams.`);

    console.log('Verifying all Basketball Teams...');
    const b = await prisma.basketballTeam.updateMany({
        data: { isVerified: true }
    });
    console.log(`Updated ${b.count} basketball teams.`);

    console.log('Verifying all Carrom Teams...');
    const c = await prisma.carromTeam.updateMany({
        data: { isVerified: true }
    });
    console.log(`Updated ${c.count} carrom teams.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
