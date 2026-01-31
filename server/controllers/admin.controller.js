const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

exports.getStats = async (req, res) => {
    try {
        const totalArticles = await prisma.article.count();
        const publishedArticles = await prisma.article.count({ where: { status: 'PUBLISHED' } });
        const draftArticles = await prisma.article.count({ where: { status: 'DRAFT' } });

        // Today's news
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayArticles = await prisma.article.count({ where: { createdAt: { gte: today } } });

        const trendingCount = await prisma.article.count({ where: { isTrending: true } });
        const breakingCount = await prisma.article.count({ where: { isBreaking: true } });

        const categoryStats = await prisma.article.groupBy({
            by: ['categoryId'],
            _count: { categoryId: true },
        });

        // Fetch category names for mapping
        const categories = await prisma.category.findMany({ select: { id: true, name: true } });

        const categoryCounts = categories.map(cat => {
            const stat = categoryStats.find(s => s.categoryId === cat.id);
            return {
                name: cat.name,
                count: stat ? stat._count.categoryId : 0
            };
        });

        const totalViews = await prisma.article.aggregate({
            _sum: { views: true }
        });

        res.json({
            totalArticles,
            publishedArticles,
            draftArticles,
            todayArticles,
            trendingCount,
            breakingCount,
            categoryCounts,
            totalViews: totalViews._sum.views || 0
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};
