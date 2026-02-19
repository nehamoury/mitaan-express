const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function cleanup() {
    console.log('🚀 Starting Media Cleanup...');

    // 1. Mark existing uncategorized media as GALLERY
    const uncategorized = await prisma.media.updateMany({
        where: {
            OR: [
                { category: null },
                { category: '' }
            ]
        },
        data: { category: 'GALLERY' }
    });
    console.log(`✅ Categorized ${uncategorized.count} items as GALLERY.`);

    // 2. Remove Duplicates by URL
    const allMedia = await prisma.media.findMany({
        orderBy: { createdAt: 'asc' }
    });

    const seenUrls = new Set();
    const duplicates = [];

    for (const item of allMedia) {
        if (seenUrls.has(item.url)) {
            duplicates.push(item.id);
        } else {
            seenUrls.add(item.url);
        }
    }

    if (duplicates.length > 0) {
        const deleted = await prisma.media.deleteMany({
            where: { id: { in: duplicates } }
        });
        console.log(`✅ Deleted ${deleted.count} duplicate media items.`);
    } else {
        console.log('✨ No duplicates found.');
    }

    console.log('🎉 Media Cleanup Completed!');
}

cleanup()
    .catch(process.stderr.write)
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
        process.exit();
    });
