require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        console.log('Checking Media table...');
        const media = await prisma.media.findMany();
        console.log(`Found ${media.length} media items.`);

        if (media.length > 0) {
            console.table(media.map(m => ({
                id: m.id,
                title: m.title.substring(0, 20),
                type: m.type,
                isPublished: m.isPublished,
                category: m.category,
                url: m.url.substring(0, 30) + '...'
            })));
        } else {
            console.log('No media items found in the database.');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
