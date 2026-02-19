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
            select: {
                id: true,
                title: true,
                status: true,
                published: true,
                language: true
            }
        });
        console.log('JSON_START');
        console.log(JSON.stringify(articles, null, 2));
        console.log('JSON_END');
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
})();
