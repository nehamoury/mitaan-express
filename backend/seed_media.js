require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding Media...');

    // Clear existing (optional, maybe not)
    // await prisma.media.deleteMany();

    const images = [
        {
            type: 'IMAGE',
            title: 'Community Gathering',
            url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?autofit=crop&q=80&w=1000',
            thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?autofit=crop&q=80&w=200',
            category: 'Events',
            isPublished: true,
            description: 'Annual gathering 2024'
        },
        {
            type: 'IMAGE',
            title: 'Local Art Exhibition',
            url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1000',
            thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=200',
            category: 'Culture',
            isPublished: true,
            description: 'Showcasing local talent'
        },
        {
            type: 'IMAGE',
            title: 'Sports Day',
            url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
            thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200',
            category: 'Sports',
            isPublished: true,
            description: 'Sprinting finale'
        }
    ];

    const videos = [
        {
            type: 'VIDEO',
            title: 'Festival Highlights',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
            thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
            category: 'Events',
            isPublished: true,
            duration: '05:30',
            description: 'Best moments from the festival'
        },
        {
            type: 'VIDEO',
            title: 'Interview with Mayor',
            url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // Placeholder
            thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000',
            category: 'News',
            isPublished: true,
            duration: '15:00',
            description: 'Exclusive interview on city development'
        }
    ];

    for (const img of images) {
        await prisma.media.create({ data: img });
    }

    for (const vid of videos) {
        await prisma.media.create({ data: vid });
    }

    console.log('Seeding complete. 3 Images and 2 Videos added.');
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
