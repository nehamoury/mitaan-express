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
            where: { status: 'PUBLISHED' },
            select: { id: true, title: true, content: true, shortDescription: true, categoryId: true, authorId: true, image: true }
        });
        process.stdout.write(JSON.stringify(articles, null, 2));
    } catch (e) {
        process.stderr.write(e.message);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
})();
