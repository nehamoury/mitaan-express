require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    try {
        const userCount = await prisma.user.count();
        const mediaCount = await prisma.media.count();
        const users = await prisma.user.findMany({ take: 5 });

        console.log(`Users count: ${userCount}`);
        console.log(`Media count: ${mediaCount}`);
        console.log('Sample Users:', JSON.stringify(users, null, 2));
    } catch (e) {
        console.error('Error checking DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

checkData();
