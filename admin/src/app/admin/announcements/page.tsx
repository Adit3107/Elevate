'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Megaphone, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, type AnnouncementFormData } from '@/../../shared/actions/announcements';

const announcementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
});

type Announcement = {
  id: string;
  title: string;
  content: string;
  fullDescription: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
      fullDescription: '',
    },
  });

  // Fetch announcements
  const fetchAnnouncements = async () => {
    setIsLoading(true);
    const result = await getAnnouncements();
    if (result.success && result.data) {
      setAnnouncements(result.data);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to fetch announcements',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle create/update
  const onSubmit = async (data: AnnouncementFormData) => {
    setIsSubmitting(true);

    const result = editingAnnouncement
      ? await updateAnnouncement(editingAnnouncement.id, data)
      : await createAnnouncement(data);

    if (result.success) {
      toast({
        title: 'Success',
        description: `Announcement ${editingAnnouncement ? 'updated' : 'created'} successfully`,
      });
      setIsDialogOpen(false);
      form.reset();
      setEditingAnnouncement(null);
      fetchAnnouncements();
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to save announcement',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deleteId) return;

    const result = await deleteAnnouncement(deleteId);

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Announcement deleted successfully',
      });
      fetchAnnouncements();
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to delete announcement',
        variant: 'destructive',
      });
    }

    setDeleteId(null);
  };

  // Open edit dialog
  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    form.reset({
      title: announcement.title,
      content: announcement.content,
      fullDescription: announcement.fullDescription,
    });
    setIsDialogOpen(true);
  };

  // Open create dialog
  const handleCreate = () => {
    setEditingAnnouncement(null);
    form.reset({
      title: '',
      content: '',
      fullDescription: '',
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <Megaphone className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight text-primary uppercase">
              Manage Announcements
            </h1>
            <p className="text-muted-foreground">Create, edit, and delete tournament announcements</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
              </DialogTitle>
              <DialogDescription>
                {editingAnnouncement
                  ? 'Update the announcement details below'
                  : 'Fill in the details to create a new announcement'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter announcement title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief summary of the announcement"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed announcement content"
                          className="resize-none"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      editingAnnouncement ? 'Update' : 'Create'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : announcements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20">
            <Megaphone className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No announcements yet</p>
            <p className="text-sm text-muted-foreground">Click "New Announcement" to create one</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3">
                      <Megaphone className="w-6 h-6 text-accent" />
                      <span className="text-xl">{announcement.title}</span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(announcement)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteId(announcement.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{announcement.content}</p>
                <p className="text-foreground">{announcement.fullDescription}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(announcement.updatedAt).toLocaleString()}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the announcement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
