
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function testDB() {
    console.log('Testing DB connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    try {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });

        console.log('Prisma initialized. Attempting to fetch articles...');
        const count = await prisma.article.count();
        console.log(`Successfully connected. Found ${count} articles.`);

        const articles = await prisma.article.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                content: true,
                shortDescription: true,
                image: true,
                videoUrl: true,
                views: true,
                status: true,
                published: true,
                language: true,
                isFeatured: true,
                isTrending: true,
                isBreaking: true,
                categoryId: true,
                createdAt: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        nameHi: true,
                        slug: true,
                        parentId: true,
                        parent: {
                            select: { id: true, name: true, nameHi: true, slug: true }
                        }
                    }
                },
                author: {
                    select: { id: true, name: true, image: true }
                },
                tags: true
            },
            take: 1
        });
        console.log('Sample article with relations:', JSON.stringify(articles, null, 2));
    } catch (e) {
        console.error('DB Test Failed:', e);
    } finally {
        process.exit();
    }
}

testDB();
