const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function translate() {
    console.log('🚀 Starting Hindi Translation Seeding...');

    const translations = [
        {
            originalTitle: "The Future of AI in 2026",
            title: "2026 में एआई का भविष्य",
            slug: "future-of-ai-2026-hi",
            content: "आर्टिफिशियल इंटेलिजेंस (AI) 2026 तक हमारे जीवन के हर पहलू को बदलने के लिए तैयार है। स्वास्थ्य सेवा से लेकर शिक्षा तक, एआई अधिक व्यक्तिगत और कुशल समाधान प्रदान करेगा। इस लेख में हम आने वाले समय के प्रमुख रुझानों पर चर्चा करेंगे।",
            shortDescription: "2026 तक एआई रुझानों का एक अवलोकन।",
            categoryId: 1, // Technology
            authorId: 1,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
        },
        {
            originalTitle: "Top 10 Gadgets to Watch",
            title: "देखने लायक टॉप 10 गैजेट्स",
            slug: "top-10-gadgets-watch-hi",
            content: "तकनीक की दुनिया हर दिन बदल रही है। इस साल बाजार में कई शानदार गैजेट्स आने वाले हैं जो आपकी जीवनशैली को और भी आधुनिक बना देंगे। स्मार्टवॉच से लेकर फोल्डिंग फोन तक, यहाँ इस साल के टॉप 10 गैजेट्स की लिस्ट दी गई है।",
            shortDescription: "आपके जीवन को बदलने वाले बेहतरीन गैजेट्स।",
            categoryId: 1, // Technology
            authorId: 1,
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000"
        },
        {
            originalTitle: "Space Exploration Updates",
            title: "अंतरिक्ष अन्वेषण अपडेट",
            slug: "space-exploration-updates-hi",
            content: "नासा और अन्य अंतरिक्ष एजेंसियां मंगल ग्रह पर मानव मिशन भेजने की तैयारी कर रही हैं। हालिया खोजों ने ब्रह्मांड के बारे में हमारी समझ को बदल दिया है। चंद्र मिशनों की वापसी के साथ, अंतरिक्ष अन्वेषण का एक नया युग शुरू हो गया है।",
            shortDescription: "मंगल और चंद्र मिशनों पर नवीनतम अपडेट।",
            categoryId: 1, // Technology
            authorId: 1,
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
        },
        {
            originalTitle: "Welcome to Mitaan Express",
            title: "मित्ताण एक्सप्रेस में आपका स्वागत है",
            slug: "welcome-to-mitaan-express-hi",
            content: "मित्ताण एक्सप्रेस के हिंदी संस्करण में आपका स्वागत है। हम आपको विश्वसनीय समाचार और विश्लेषण प्रदान करने के लिए प्रतिबद्ध हैं। हमारे साथ जुड़ें और देश-दुनिया की ताज़ा खबरों से अपडेट रहें।",
            shortDescription: "मित्ताण एक्सप्रेस की ओर से नवीनतम अपडेट।",
            categoryId: 2, // National
            authorId: 1,
            image: "https://images.unsplash.com/photo-1504711432869-748576449ef5?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    for (const art of translations) {
        await prisma.article.upsert({
            where: { slug: art.slug },
            update: {
                title: art.title,
                content: art.content,
                shortDescription: art.shortDescription,
                status: 'PUBLISHED',
                published: true,
                language: 'hi'
            },
            create: {
                title: art.title,
                slug: art.slug,
                content: art.content,
                shortDescription: art.shortDescription,
                status: 'PUBLISHED',
                published: true,
                language: 'hi',
                categoryId: art.categoryId,
                authorId: art.authorId,
                image: art.image
            }
        });
        console.log(`Hindi translation ready: ${art.title}`);
    }

    console.log('✅ Hindi Translation Seeding Completed!');
}

translate()
    .catch((e) => {
        console.error('❌ Seeding Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
        process.exit();
    });
