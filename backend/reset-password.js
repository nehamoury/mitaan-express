require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function resetAdminPassword() {
    // New password - change this to whatever you want
    const NEW_PASSWORD = 'admin123';

    // Hash the password
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);

    // Find admin user and update password
    const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' }
    });

    console.log('Found', admins.length, 'admin users');

    if (admins.length === 0) {
        console.log('No admin users found. Creating one...');
        await prisma.user.create({
            data: {
                email: 'admin@mitaan.com',
                password: hashedPassword,
                name: 'Admin',
                role: 'ADMIN'
            }
        });
        console.log('\n✅ Created new admin user:');
        console.log('   Email: admin@mitaan.com');
        console.log('   Password: ' + NEW_PASSWORD);
    } else {
        // Update all admin passwords
        for (const admin of admins) {
            await prisma.user.update({
                where: { id: admin.id },
                data: { password: hashedPassword }
            });
            console.log(`\n✅ Password reset for: ${admin.email}`);
        }
        console.log('\n   New Password: ' + NEW_PASSWORD);
    }

    await prisma.$disconnect();
    await pool.end();
}

resetAdminPassword().catch(console.error);
