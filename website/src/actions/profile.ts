'use server';

import { prisma } from '../lib/prisma';

export type UserRegistration = {
    id: string;
    sport: 'Volleyball' | 'Basketball' | 'Carrom';
    teamName: string;
    captainName: string;
    category: string;
    createdAt: Date;
    transactionId?: string | null;
    isVerified: boolean;
};

export async function getUserRegistrations(userId: string): Promise<UserRegistration[]> {
    try {
        const [volleyball, basketball, carrom] = await Promise.all([
            prisma.volleyballTeam.findMany({
                where: { userId },
                select: {
                    id: true,
                    teamName: true,
                    captainName: true,
                    category: true,
                    createdAt: true,
                    transactionId: true,
                    isVerified: true,
                },
            }),
            prisma.basketballTeam.findMany({
                where: { userId },
                select: {
                    id: true,
                    teamName: true,
                    captainName: true,
                    category: true,
                    createdAt: true,
                    transactionId: true,
                    isVerified: true,
                },
            }),
            prisma.carromTeam.findMany({
                where: { userId },
                select: {
                    id: true,
                    teamName: true,
                    captainName: true,
                    category: true,
                    createdAt: true,
                    transactionId: true,
                    isVerified: true,
                },
            }),
        ]);

        const registrations: UserRegistration[] = [
            ...volleyball.map((v) => ({ ...v, sport: 'Volleyball' as const })),
            ...basketball.map((b) => ({ ...b, sport: 'Basketball' as const })),
            ...carrom.map((c) => ({ ...c, sport: 'Carrom' as const })),
        ];

        // Sort by creation date, newest first
        return registrations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
        console.error('Error fetching user registrations:', error);
        return [];
    }
}
