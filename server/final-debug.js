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
            where: {},
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
            orderBy: { createdAt: 'desc' }
        });
        console.log('Success:', articles.length);
    } catch (e) {
        console.log('PRISMA_ERROR_START');
        console.error(e);
        console.log('PRISMA_ERROR_END');
    } finally {
        await prisma.$disconnect();
    }
}
debug();
