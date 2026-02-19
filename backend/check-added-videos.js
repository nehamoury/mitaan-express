const prisma = require('./prisma');

async function checkVideos() {
    try {
        const videos = await prisma.media.findMany({
            where: { type: 'VIDEO' },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        console.log('📹 Recently added videos:');
        console.log(JSON.stringify(videos, null, 2));
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
        process.exit();
    }
}

checkVideos();
