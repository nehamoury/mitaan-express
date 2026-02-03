const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Get all published media for frontend
exports.getPublicMedia = async (req, res) => {
    try {
        const { type } = req.query; // 'IMAGE' or 'VIDEO'

        const where = { isPublished: true };
        if (type) where.type = type;

        const media = await prisma.media.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        res.json(media);
    } catch (error) {
        console.error('Fetch public media error:', error);
        res.status(500).json({ error: 'Failed to fetch media' });
    }
};

// Get all media for admin
exports.getAdminMedia = async (req, res) => {
    try {
        const { type } = req.query;

        const where = {};
        if (type) where.type = type;

        const media = await prisma.media.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        res.json(media);
    } catch (error) {
        console.error('Fetch admin media error:', error);
        res.status(500).json({ error: 'Failed to fetch media' });
    }
};

// Create new media
exports.createMedia = async (req, res) => {
    try {
        const { type, title, description, url, thumbnail, category, size, duration } = req.body;

        if (!type || !title || !url) {
            return res.status(400).json({ error: 'Type, title, and URL are required' });
        }

        const media = await prisma.media.create({
            data: {
                type,
                title,
                description,
                url,
                thumbnail,
                category,
                size,
                duration
            }
        });

        res.status(201).json(media);
    } catch (error) {
        console.error('Create media error:', error);
        res.status(500).json({ error: 'Failed to create media' });
    }
};

// Update media
exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, isPublished } = req.body;

        const media = await prisma.media.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                category,
                isPublished
            }
        });

        res.json(media);
    } catch (error) {
        console.error('Update media error:', error);
        res.status(500).json({ error: 'Failed to update media' });
    }
};

// Delete media
exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.media.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Media deleted successfully' });
    } catch (error) {
        console.error('Delete media error:', error);
        res.status(500).json({ error: 'Failed to delete media' });
    }
};

// Increment views
exports.incrementViews = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await prisma.media.update({
            where: { id: parseInt(id) },
            data: {
                views: { increment: 1 }
            }
        });

        res.json(media);
    } catch (error) {
        console.error('Increment views error:', error);
        res.status(500).json({ error: 'Failed to increment views' });
    }
};
