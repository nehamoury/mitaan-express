require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
    try {
        console.log('Attempting to fetch articles with full select...');
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
            }
        });
        console.log('Success Count:', articles.length);
    } catch (e) {
        console.error('Prisma Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
