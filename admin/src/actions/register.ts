'use server';

import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

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

export async function registerVolleyballTeam(
  prevState: RegistrationState,
  formData: z.infer<typeof formSchema>
): Promise<RegistrationState> {
  const user = await currentUser();

  if (!user) {
    return { success: false, message: 'User not authenticated', error: 'User not authenticated' };
  }

  try {
    await prisma.volleyballTeam.create({
      data: {
        ...formData,
        userId: user.id,
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
  const user = await currentUser();

  if (!user) {
    return { success: false, message: 'User not authenticated', error: 'User not authenticated' };
  }

  try {
    await prisma.basketballTeam.create({
      data: {
        ...formData,
        userId: user.id,
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
  const user = await currentUser();

  if (!user) {
    return { success: false, message: 'User not authenticated', error: 'User not authenticated' };
  }

  try {
    await prisma.carromTeam.create({
      data: {
        ...formData,
        userId: user.id,
      },
    });

    revalidatePath('/admin/carrom');
    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to register team', error: 'Database error' };
  }
}
