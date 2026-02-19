const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

(async () => {
    try {
        const articles = await prisma.article.findMany({
            select: { title: true, language: true, status: true }
        });
        articles.forEach(a => {
            console.log(`TITLE: ${a.title} | LANG: ${a.language} | STATUS: ${a.status}`);
        });
    } catch (e) {
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
})();
