import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export interface CurrentUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
}

/**
 * Get the current authenticated user from the server
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return null;
        }

        // Verify token
        const payload = await verifyToken(token);

        if (!payload) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true,
            },
        });

        return user;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

/**
 * Require authentication - throws error if not authenticated
 * Use in server components/actions that require auth
 */
export async function requireAuth(): Promise<CurrentUser> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}
