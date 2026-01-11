'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getUserRegistrations, type UserRegistration } from '@/actions/profile';
import { format } from 'date-fns';
import { LogOut, Mail, User, Trophy } from 'lucide-react';

type CategoryFilter = 'all' | 'men' | 'women';

type UserData = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

    useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        try {
            // Fetch user data
            const userResponse = await fetch('/api/auth/me');
            if (!userResponse.ok) {
                router.push('/sign-in');
                return;
            }
            const userData = await userResponse.json();
            setUser(userData.user);

            // Fetch registrations
            const regs = await getUserRegistrations(userData.user.id);
            setRegistrations(regs);
        } catch (error) {
            console.error('Error loading user data:', error);
            router.push('/sign-in');
        } finally {
            setLoading(false);
        }
    }

    const handleSignOut = async () => {
        await fetch('/api/auth/signout', { method: 'POST' });
        router.push('/');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <p className="text-center text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const filteredRegistrations = categoryFilter === 'all'
        ? registrations
        : registrations.filter(reg => reg.category.toLowerCase() === categoryFilter);

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <div className="flex flex-col gap-8">
                {/* User Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline">Profile</CardTitle>
                        <CardDescription>Your account information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">First Name</p>
                                    <p className="font-medium">{user.firstName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Name</p>
                                    <p className="font-medium">{user.lastName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:col-span-2">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button
                                variant="destructive"
                                className="w-full md:w-auto"
                                onClick={handleSignOut}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Registrations Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-6 w-6" />
                            My Registrations
                        </CardTitle>
                        <CardDescription>
                            {registrations.length === 0
                                ? 'You have not registered for any tournaments yet.'
                                : `You have registered for ${registrations.length} tournament${registrations.length > 1 ? 's' : ''}.`}
                        </CardDescription>
                        {registrations.length > 0 && (
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => setCategoryFilter('all')}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === 'all'
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setCategoryFilter('men')}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === 'men'
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    Men
                                </button>
                                <button
                                    onClick={() => setCategoryFilter('women')}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === 'women'
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    Women
                                </button>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        {registrations.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No registrations yet</p>
                                <Button asChild className="mt-4">
                                    <a href="/register">Register for a Tournament</a>
                                </Button>
                            </div>
                        ) : filteredRegistrations.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No registrations found for this category</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredRegistrations.map((reg) => (
                                    <div
                                        key={reg.id}
                                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg">{reg.sport}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {format(new Date(reg.createdAt), 'PPP')}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                                    {reg.category}
                                                </span>
                                                <Badge variant={reg.isVerified ? 'default' : 'secondary'}>
                                                    {reg.isVerified ? 'Verified' : 'Pending'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="grid gap-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Team: </span>
                                                <span className="font-medium">{reg.teamName}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Captain: </span>
                                                <span className="font-medium">{reg.captainName}</span>
                                            </div>
                                            {reg.transactionId && (
                                                <div>
                                                    <span className="text-muted-foreground">Transaction ID: </span>
                                                    <span className="font-mono text-xs">{reg.transactionId}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
