const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const articleCount = await prisma.article.count();
    const articles = await prisma.article.findMany({
        take: 5,
        select: { id: true, title: true, status: true, language: true }
    });
    console.log('Total Articles:', articleCount);
    console.log('Recent Articles:', JSON.stringify(articles, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
