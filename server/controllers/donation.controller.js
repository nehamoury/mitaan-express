const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDonation = async (req, res) => {
    try {
        const { name, email, amount, message, method } = req.body;

        if (!name || !email || !amount) {
            return res.status(400).json({ message: 'Name, email and amount are required' });
        }

        const donation = await prisma.donation.create({
            data: {
                name,
                email,
                amount: parseFloat(amount),
                message,
                method,
                status: 'SUCCESS' // Assuming success for now since we don't have real PG
            }
        });

        res.status(201).json(donation);
    } catch (error) {
        console.error('Create donation error:', error);
        res.status(500).json({ message: 'Error creating donation', error: error.message });
    }
};

const getAllDonations = async (req, res) => {
    try {
        const donations = await prisma.donation.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(donations);
    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
};

module.exports = {
    createDonation,
    getAllDonations
};
