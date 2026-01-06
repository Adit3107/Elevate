const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const existingAnnouncements = [
    {
        title: 'Registration Now Open!',
        content: 'Team registration for Elevate 2026 is officially open. Register your team now!',
        fullDescription: 'We are excited to announce that registration for Elevate 2026 is now open! Teams can register for Volleyball, Basketball, and Carrom tournaments. Don\'t miss this opportunity to showcase your skills and compete with the best teams. Visit the registration page to sign up your team today!'
    },
    {
        title: 'About Fixtures',
        content: 'Fixtures of the Tournament will be announced soon. Check the fixtures page for details.',
        fullDescription: 'The tournament fixtures will be released shortly. Once published, you can view the complete schedule, match timings, and venue details on our fixtures page. Stay tuned for updates!'
    },
];

async function main() {
    console.log('Seeding announcements...');

    for (const announcement of existingAnnouncements) {
        await prisma.announcement.create({
            data: announcement,
        });
        console.log(`Created announcement: ${announcement.title}`);
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
