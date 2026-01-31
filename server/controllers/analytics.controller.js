const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
    try {
        const { period = 'daily' } = req.query; // daily, weekly, monthly

        const now = new Date();
        let startDate;

        switch (period) {
            case 'weekly':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'monthly':
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
            default: // daily
                startDate = new Date(now.setDate(now.getDate() - 1));
        }

        // Total articles
        const totalArticles = await prisma.article.count();

        // Published articles
        const publishedArticles = await prisma.article.count({
            where: { status: 'PUBLISHED' }
        });

        // Total views
        const viewsResult = await prisma.article.aggregate({
            _sum: { views: true }
        });
        const totalViews = viewsResult._sum.views || 0;

        // Total comments
        const totalComments = await prisma.comment.count();

        // Pending comments
        const pendingComments = await prisma.comment.count({
            where: { status: 'PENDING' }
        });

        // Most viewed articles (Top 10)
        const mostViewedArticles = await prisma.article.findMany({
            where: { status: 'PUBLISHED' },
            select: {
                id: true,
                title: true,
                slug: true,
                views: true,
                image: true,
                category: {
                    select: { name: true, slug: true }
                },
                createdAt: true
            },
            orderBy: { views: 'desc' },
            take: 10
        });

        // Category-wise article count
        const categoryStats = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                _count: {
                    select: { articles: true }
                }
            },
            orderBy: {
                articles: {
                    _count: 'desc'
                }
            }
        });

        // Recent activity (last 7 days)
        const recentArticles = await prisma.article.count({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        });

        const recentComments = await prisma.comment.count({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        });

        res.json({
            overview: {
                totalArticles,
                publishedArticles,
                totalViews,
                totalComments,
                pendingComments
            },
            mostViewedArticles,
            categoryStats: categoryStats.map(cat => ({
                name: cat.name,
                slug: cat.slug,
                count: cat._count.articles
            })),
            recentActivity: {
                articles: recentArticles,
                comments: recentComments
            }
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

// Get traffic analytics
exports.getTrafficAnalytics = async (req, res) => {
    try {
        const { days = 30 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        // Daily views trend (simulated - in production, you'd track actual analytics)
        const articles = await prisma.article.findMany({
            where: {
                createdAt: {
                    gte: startDate
                }
            },
            select: {
                createdAt: true,
                views: true
            }
        });

        // Group by date
        const dailyViews = {};
        articles.forEach(article => {
            const date = article.createdAt.toISOString().split('T')[0];
            dailyViews[date] = (dailyViews[date] || 0) + article.views;
        });

        res.json({
            dailyViews: Object.entries(dailyViews).map(([date, views]) => ({
                date,
                views
            }))
        });
    } catch (error) {
        console.error('Traffic analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch traffic analytics' });
    }
};

// Get comment activity
exports.getCommentActivity = async (req, res) => {
    try {
        const { days = 7 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const comments = await prisma.comment.findMany({
            where: {
                createdAt: {
                    gte: startDate
                }
            },
            select: {
                createdAt: true,
                status: true
            }
        });

        // Group by date and status
        const dailyComments = {};
        comments.forEach(comment => {
            const date = comment.createdAt.toISOString().split('T')[0];
            if (!dailyComments[date]) {
                dailyComments[date] = { total: 0, approved: 0, pending: 0, rejected: 0, spam: 0 };
            }
            dailyComments[date].total++;
            dailyComments[date][comment.status.toLowerCase()]++;
        });

        res.json({
            dailyComments: Object.entries(dailyComments).map(([date, stats]) => ({
                date,
                ...stats
            }))
        });
    } catch (error) {
        console.error('Comment activity error:', error);
        res.status(500).json({ error: 'Failed to fetch comment activity' });
    }
};
