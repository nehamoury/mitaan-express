const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

(async () => {
    try {
        const count = await prisma.article.count();
        console.log('Current Article Count in Docker:', count);
        const articles = await prisma.article.findMany({ select: { title: true } });
        console.log('Articles:', articles.map(a => a.title));
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
})();
