
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Checking Volleyball Teams...');
    const volleyballTeams = await prisma.volleyballTeam.findMany();
    console.log(`Found ${volleyballTeams.length} volleyball teams.`);
    volleyballTeams.forEach(team => {
        console.log(`- Team: ${team.teamName}, ID: ${team.id}, Verified: ${team.isVerified}`);
    });

    console.log('\nChecking Basketball Teams...');
    const basketballTeams = await prisma.basketballTeam.findMany();
    console.log(`Found ${basketballTeams.length} basketball teams.`);
    basketballTeams.forEach(team => {
        console.log(`- Team: ${team.teamName}, ID: ${team.id}, Verified: ${team.isVerified}`);
    });

    console.log('\nChecking Carrom Teams...');
    const carromTeams = await prisma.carromTeam.findMany();
    console.log(`Found ${carromTeams.length} carrom teams.`);
    carromTeams.forEach(team => {
        console.log(`- Team: ${team.teamName}, ID: ${team.id}, Verified: ${team.isVerified}`);
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
