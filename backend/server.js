require('./logger-shim');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');
const categoryRoutes = require('./routes/category.routes');
const adminRoutes = require('./routes/admin.routes');
const settingsRoutes = require('./routes/settings.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const activityRoutes = require('./routes/activity.routes');
const blogRoutes = require('./routes/blog.routes');
const mediaRoutes = require('./routes/media.routes');
const donationRoutes = require('./routes/donation.routes');
const contactRoutes = require('./routes/contact.routes');


app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.send('Mitaan Express API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
