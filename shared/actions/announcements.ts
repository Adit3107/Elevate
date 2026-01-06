'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Validation schema for announcement
const announcementSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;

// Get all announcements
export async function getAnnouncements() {
    try {
        const announcements = await prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, data: announcements };
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return { success: false, error: 'Failed to fetch announcements' };
    }
}

// Create new announcement
export async function createAnnouncement(data: AnnouncementFormData) {
    try {
        const validatedData = announcementSchema.parse(data);

        const announcement = await prisma.announcement.create({
            data: validatedData,
        });

        revalidatePath('/announcements');
        revalidatePath('/admin/announcements');

        return { success: true, data: announcement };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }
        console.error('Error creating announcement:', error);
        return { success: false, error: 'Failed to create announcement' };
    }
}

// Update announcement
export async function updateAnnouncement(id: string, data: AnnouncementFormData) {
    try {
        const validatedData = announcementSchema.parse(data);

        const announcement = await prisma.announcement.update({
            where: { id },
            data: validatedData,
        });

        revalidatePath('/announcements');
        revalidatePath('/admin/announcements');

        return { success: true, data: announcement };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }
        console.error('Error updating announcement:', error);
        return { success: false, error: 'Failed to update announcement' };
    }
}

// Delete announcement
export async function deleteAnnouncement(id: string) {
    try {
        await prisma.announcement.delete({
            where: { id },
        });

        revalidatePath('/announcements');
        revalidatePath('/admin/announcements');

        return { success: true };
    } catch (error) {
        console.error('Error deleting announcement:', error);
        return { success: false, error: 'Failed to delete announcement' };
    }
}
