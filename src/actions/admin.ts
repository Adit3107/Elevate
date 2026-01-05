'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type TeamRegistration = {
    id: string;
    sport: 'Volleyball' | 'Basketball' | 'Carrom';
    teamName: string;
    captainName: string;
    contactNo: string;
    altContactNo?: string | null;
    category: string;
    transactionId?: string | null;
    userId: string;
    isVerified: boolean;
    createdAt: Date;
};

export async function getAllVolleyballTeams(): Promise<TeamRegistration[]> {
    try {
        const teams = await prisma.volleyballTeam.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team: any) => ({ ...team, sport: 'Volleyball' as const }));
    } catch (error) {
        console.error('Error fetching volleyball teams:', error);
        return [];
    }
}

export async function getAllBasketballTeams(): Promise<TeamRegistration[]> {
    try {
        const teams = await prisma.basketballTeam.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team: any) => ({ ...team, sport: 'Basketball' as const }));
    } catch (error) {
        console.error('Error fetching basketball teams:', error);
        return [];
    }
}

export async function getAllCarromTeams(): Promise<TeamRegistration[]> {
    try {
        const teams = await prisma.carromTeam.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team: any) => ({ ...team, sport: 'Carrom' as const }));
    } catch (error) {
        console.error('Error fetching carrom teams:', error);
        return [];
    }
}

// Functions to fetch only verified teams (for user-facing pages)
export async function getVerifiedVolleyballTeams(): Promise<TeamRegistration[]> {
    try {
        const teams = await prisma.volleyballTeam.findMany({
            where: { isVerified: true },
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team: any) => ({ ...team, sport: 'Volleyball' as const }));
    } catch (error) {
        console.error('Error fetching verified volleyball teams:', error);
        return [];
    }
}

export async function getVerifiedBasketballTeams(): Promise<TeamRegistration[]> {
    try {
        const teams = await prisma.basketballTeam.findMany({
            where: { isVerified: true },
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team: any) => ({ ...team, sport: 'Basketball' as const }));
    } catch (error) {
        console.error('Error fetching verified basketball teams:', error);
        return [];
    }
}

export async function getVerifiedCarromTeams(): Promise<TeamRegistration[]> {
    try {
        const teams = await prisma.carromTeam.findMany({
            where: { isVerified: true },
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team: any) => ({ ...team, sport: 'Carrom' as const }));
    } catch (error) {
        console.error('Error fetching verified carrom teams:', error);
        return [];
    }
}

export async function verifyTeam(sport: 'Volleyball' | 'Basketball' | 'Carrom', teamId: string, isVerified: boolean) {
    try {
        if (sport === 'Volleyball') {
            await prisma.volleyballTeam.update({
                where: { id: teamId },
                data: { isVerified },
            });
        } else if (sport === 'Basketball') {
            await prisma.basketballTeam.update({
                where: { id: teamId },
                data: { isVerified },
            });
        } else if (sport === 'Carrom') {
            await prisma.carromTeam.update({
                where: { id: teamId },
                data: { isVerified },
            });
        }

        revalidatePath('/admin/registrations');
        revalidatePath('/admin/teams');
        revalidatePath('/teams');
        return { success: true };
    } catch (error) {
        console.error('Error verifying team:', error);
        return { success: false, error: 'Failed to verify team' };
    }
}
