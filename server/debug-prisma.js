require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
    try {
        console.log('Attempting to fetch articles...');
        const articles = await prisma.article.findMany({
            take: 1,
            select: { id: true, title: true }
        });
        console.log('Success!', articles);
    } catch (e) {
        console.error('Prisma Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
