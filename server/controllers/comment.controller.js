const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Bad words list for spam filtering
const BAD_WORDS = ['spam', 'scam', 'fake', 'click here', 'buy now', 'limited offer'];

const containsBadWords = (text) => {
    const lowerText = text.toLowerCase();
    return BAD_WORDS.some(word => lowerText.includes(word));
};

// Get all comments (Admin)
exports.getAllComments = async (req, res) => {
    try {
        const { status, articleId } = req.query;

        const where = {};
        if (status) where.status = status;
        if (articleId) where.articleId = parseInt(articleId);

        const comments = await prisma.comment.findMany({
            where,
            include: {
                article: {
                    select: { id: true, title: true, slug: true }
                },
                user: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(comments);
    } catch (error) {
        console.error('Fetch comments error:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

// Create comment (Public)
exports.createComment = async (req, res) => {
    try {
        const { content, articleId, name, email } = req.body;
        const userId = req.user?.id; // Optional if user is logged in

        if (!content || !articleId) {
            return res.status(400).json({ error: 'Content and articleId are required' });
        }

        // Check for spam
        const isSpam = containsBadWords(content);

        const comment = await prisma.comment.create({
            data: {
                content,
                articleId: parseInt(articleId),
                userId,
                name: name || req.user?.name,
                email: email || req.user?.email,
                status: isSpam ? 'SPAM' : 'PENDING',
                isSpam
            }
        });

        res.json({
            message: 'Comment submitted for moderation',
            comment
        });
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

// Approve comment (Admin/Editor)
exports.approveComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: {
                status: 'APPROVED',
                isSpam: false
            }
        });

        res.json({ message: 'Comment approved', comment });
    } catch (error) {
        console.error('Approve comment error:', error);
        res.status(500).json({ error: 'Failed to approve comment' });
    }
};

// Reject comment (Admin/Editor)
exports.rejectComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const comment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: {
                status: 'REJECTED',
                rejectionReason: reason
            }
        });

        res.json({ message: 'Comment rejected', comment });
    } catch (error) {
        console.error('Reject comment error:', error);
        res.status(500).json({ error: 'Failed to reject comment' });
    }
};

// Mark as spam (Admin/Editor)
exports.markAsSpam = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: {
                status: 'SPAM',
                isSpam: true
            }
        });

        res.json({ message: 'Comment marked as spam', comment });
    } catch (error) {
        console.error('Mark spam error:', error);
        res.status(500).json({ error: 'Failed to mark as spam' });
    }
};

// Delete comment (Admin)
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.comment.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Comment deleted' });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};

// Get comments for an article (Public - only approved)
exports.getArticleComments = async (req, res) => {
    try {
        const { articleId } = req.params;

        const comments = await prisma.comment.findMany({
            where: {
                articleId: parseInt(articleId),
                status: 'APPROVED'
            },
            include: {
                user: {
                    select: { name: true, image: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(comments);
    } catch (error) {
        console.error('Fetch article comments error:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
