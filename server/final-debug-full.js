require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function debug() {
    try {
        const articles = await prisma.article.findMany({
            take: 1
        });
        console.log('Success:', articles.length);
    } catch (e) {
        console.log('--- ERROR START ---');
        console.dir(e, { depth: null });
        console.log('--- ERROR END ---');
    } finally {
        await prisma.$disconnect();
    }
}
debug();
