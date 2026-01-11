'use server';

import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../lib/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const formSchema = z.object({
  teamName: z.string().min(3),
  captainName: z.string().min(3),
  contactNo: z.string().regex(/^\d{10}$/),
  altContactNo: z.string().regex(/^\d{10}$/).optional().or(z.literal('')),
  category: z.enum(['men', 'women', 'singles', 'doubles']),
  transactionId: z.string().optional(),
});

export type RegistrationState = {
  success: boolean;
  message: string;
  error?: string;
};

async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload?.userId || null;
}

export async function registerVolleyballTeam(
  prevState: RegistrationState,
  formData: z.infer<typeof formSchema>
): Promise<RegistrationState> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return { success: false, message: 'User not authenticated', error: 'User not authenticated' };
  }

  try {
    await prisma.volleyballTeam.create({
      data: {
        ...formData,
        userId,
      },
    });

    revalidatePath('/admin/volleyball');
    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to register team', error: 'Database error' };
  }
}

export async function registerBasketballTeam(
  prevState: RegistrationState,
  formData: z.infer<typeof formSchema>
): Promise<RegistrationState> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return { success: false, message: 'User not authenticated', error: 'User not authenticated' };
  }

  try {
    await prisma.basketballTeam.create({
      data: {
        ...formData,
        userId,
      },
    });

    revalidatePath('/admin/basketball');
    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to register team', error: 'Database error' };
  }
}

export async function registerCarromTeam(
  prevState: RegistrationState,
  formData: z.infer<typeof formSchema>
): Promise<RegistrationState> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return { success: false, message: 'User not authenticated', error: 'User not authenticated' };
  }

  try {
    await prisma.carromTeam.create({
      data: {
        ...formData,
        userId,
      },
    });

    revalidatePath('/admin/carrom');
    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to register team', error: 'Database error' };
  }
}
