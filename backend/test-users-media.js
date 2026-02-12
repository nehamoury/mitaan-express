const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function testUsersMedia() {
    console.log('Testing Users and Media...');

    try {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });

        console.log('Fetching users...');
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
                _count: {
                    select: {
                        articles: true
                    }
                }
            },
            take: 5
        });
        console.log(`Found ${users.length} users:`, JSON.stringify(users, null, 2));

        console.log('Fetching media...');
        const media = await prisma.media.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log(`Found ${media.length} media:`, JSON.stringify(media, null, 2));

    } catch (e) {
        console.error('Test Failed:', e);
    } finally {
        process.exit();
    }
}

testUsersMedia();
