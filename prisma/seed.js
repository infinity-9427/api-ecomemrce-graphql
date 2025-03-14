// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.create({
            data: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            },
        });

        console.log('Seed data created:', user);
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();