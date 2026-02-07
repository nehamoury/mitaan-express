const prisma = require('./prisma');

async function main() {
    console.log('Seeding Application Settings...');

    const settings = [
        // Ads Settings
        {
            key: 'ad_homepage_top_enabled',
            value: 'true'
        },
        {
            key: 'ad_homepage_top_code',
            value: '<div style="width:100%; height:120px; background:linear-gradient(45deg, #eee, #ddd); border:1px solid #ccc; display:flex; align-items:center; justify-content:center; color:#555; font-family:sans-serif; text-align:center;"><p><strong>HOMEPAGE HEADER AD</strong><br>Responsive 728x90 or Fluid</p></div>'
        },
        {
            key: 'ad_article_top_enabled',
            value: 'true'
        },
        {
            key: 'ad_article_top_code',
            value: '<div style="width:100%; padding:20px; background:#f9f9f9; border:1px dashed #999; text-align:center; color:#666; margin: 20px 0;"><p><strong>ARTICLE TOP AD</strong><br>Matches Content Width</p></div>'
        },
        {
            key: 'ad_article_bottom_enabled',
            value: 'true'
        },
        {
            key: 'ad_article_bottom_code',
            value: '<div style="width:100%; height:250px; background:#fafafa; border:1px solid #ddd; display:flex; align-items:center; justify-content:center; color:#888; margin-top:20px;"><strong>ARTICLE BOTTOM AD (300x250)</strong></div>'
        },
        // Donation Settings
        {
            key: 'donation_upi_id',
            value: 'mitaanexpress@okaxis'
        },
        {
            key: 'donation_account_holder',
            value: 'Mitaan Express Media Trust'
        },
        {
            key: 'donation_bank_name',
            value: 'State Bank of India'
        },
        {
            key: 'donation_account_number',
            value: '9876543210123'
        },
        {
            key: 'donation_ifsc',
            value: 'SBIN0001234'
        }
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: {
                key: setting.key,
                value: setting.value
            }
        });
        console.log(`Upserted setting: ${setting.key}`);
    }

    console.log('Seeding Complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
