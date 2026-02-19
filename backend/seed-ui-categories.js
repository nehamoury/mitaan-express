const prisma = require('./prisma');

async function seedCategories() {
    console.log('🚀 Starting Category Seeding (UI Matching)...');

    const structure = [
        {
            header: { name: 'News Section', slug: 'news-header', icon: 'Globe' },
            items: [
                { name: 'Economic', nameHi: 'आर्थिक', slug: 'economic', icon: 'TrendingUp' },
                { name: 'Crime', nameHi: 'अपराध', slug: 'crime', icon: 'AlertTriangle' },
                { name: 'Political', nameHi: 'राजनीति', slug: 'political', icon: 'Building2' },
                { name: 'Social', nameHi: 'सामाजिक', slug: 'social', icon: 'Users' }
            ]
        },
        {
            header: { name: 'Writing Section', slug: 'writing-header', icon: 'PenTool' },
            items: [
                { name: 'Articles', nameHi: 'लेख', slug: 'articles', icon: 'FileText' },
                { name: 'Thoughts', nameHi: 'विचार', slug: 'thoughts', icon: 'Lightbulb' },
                { name: 'Stories', nameHi: 'कहानियाँ', slug: 'stories', icon: 'BookOpen' },
                { name: 'Poetry', nameHi: 'कविता', slug: 'poetry', icon: 'Feather' },
                { name: 'Analysis', nameHi: 'विश्लेषण', slug: 'analysis', icon: 'Search' },
                { name: 'Satire', nameHi: 'व्यंग्य', slug: 'satire', icon: 'Smile' }
            ]
        },
        {
            header: { name: 'Knowledge & Films Section', slug: 'knowledge-films-header', icon: 'Clapperboard' },
            items: [
                { name: 'History', nameHi: 'इतिहास', slug: 'history', icon: 'History' },
                { name: 'Art', nameHi: 'कला', slug: 'art', icon: 'Palette' },
                { name: 'Awards', nameHi: 'पुरस्कार', slug: 'awards', icon: 'Trophy' },
                { name: 'Reviews', nameHi: 'समीक्षा', slug: 'reviews', icon: 'Star' },
                { name: 'Religious Culture', nameHi: 'धार्मिक संस्कृति', slug: 'religious-culture', icon: 'Church' }
            ]
        },
        {
            header: { name: 'Wellness Section', slug: 'wellness-header', icon: 'Activity' },
            items: [
                { name: 'Sports', nameHi: 'खेल', slug: 'sports', icon: 'Dribbble' },
                { name: 'Players', nameHi: 'खिलाड़ी', slug: 'players', icon: 'UserSquare' },
                { name: 'Yoga', nameHi: 'योग', slug: 'yoga', icon: 'Flower2' }
            ]
        },
        {
            header: { name: 'Technology Section', slug: 'technology-header', icon: 'Cpu' },
            items: [
                { name: 'Technology', nameHi: 'तकनीक', slug: 'technology', icon: 'Laptop' }
            ]
        }
    ];

    for (const group of structure) {
        // Create or update header
        const header = await prisma.category.upsert({
            where: { slug: group.header.slug },
            update: {
                name: group.header.name,
                icon: group.header.icon
            },
            create: {
                name: group.header.name,
                slug: group.header.slug,
                icon: group.header.icon
            }
        });
        console.log(`Header ready: ${header.name}`);

        for (const item of group.items) {
            await prisma.category.upsert({
                where: { slug: item.slug },
                update: {
                    name: item.name,
                    nameHi: item.nameHi,
                    icon: item.icon,
                    parentId: header.id
                },
                create: {
                    name: item.name,
                    nameHi: item.nameHi,
                    slug: item.slug,
                    icon: item.icon,
                    parentId: header.id
                }
            });
            console.log(`  Sub-category ready: ${item.name}`);
        }
    }

    console.log('✅ UI Categories Seeded Successfully!');
}

seedCategories()
    .catch((e) => {
        console.error('❌ Seeding Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        process.exit();
    });
