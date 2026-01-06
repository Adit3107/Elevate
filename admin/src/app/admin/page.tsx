import Link from 'next/link';
import {
  Bell,
  GalleryVertical,
  Medal,
  Swords,
  Users,
  ArrowRight
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const managementSections = [
  {
    title: 'Manage Teams',
    description: 'View and manage registered teams.',
    icon: Users,
    href: '/admin/teams',
  },
  {
    title: 'Manage Fixtures',
    description: 'Create, update, and publish tournament fixtures.',
    icon: Swords,
    href: '/admin/fixtures',
  },
  {
    title: 'Manage Results',
    description: 'Enter and display match results.',
    icon: Medal,
    href: '/admin/results',
  },
  {
    title: 'Manage Announcements',
    description: 'Post news and updates for participants.',
    icon: Bell,
    href: '/admin/announcements',
  },
  {
    title: 'Manage Gallery',
    description: 'Upload and organize event photos.',
    icon: GalleryVertical,
    href: '/admin/gallery',
  },
];

export default function AdminDashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Admin Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {managementSections.map(section => (
          <Card key={section.href} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {section.title}
              </CardTitle>
              <section.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <CardDescription className="flex-1">{section.description}</CardDescription>
              <Button asChild className="mt-4 w-full">
                <Link href={section.href}>
                  Go to section <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
