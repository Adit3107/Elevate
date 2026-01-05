'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllVolleyballTeams, getAllBasketballTeams, getAllCarromTeams, verifyTeam, type TeamRegistration } from '@/actions/admin';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Phone, Mail, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminRegistrationsPage() {
    const [volleyballTeams, setVolleyballTeams] = useState<TeamRegistration[]>([]);
    const [basketballTeams, setBasketballTeams] = useState<TeamRegistration[]>([]);
    const [carromTeams, setCarromTeams] = useState<TeamRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadTeams();
    }, []);

    async function loadTeams() {
        setLoading(true);
        const [vb, bb, cr] = await Promise.all([
            getAllVolleyballTeams(),
            getAllBasketballTeams(),
            getAllCarromTeams(),
        ]);
        setVolleyballTeams(vb);
        setBasketballTeams(bb);
        setCarromTeams(cr);
        setLoading(false);
    }

    async function handleVerify(sport: 'Volleyball' | 'Basketball' | 'Carrom', teamId: string, currentStatus: boolean) {
        const result = await verifyTeam(sport, teamId, !currentStatus);
        if (result.success) {
            toast({
                title: 'Success',
                description: `Team ${!currentStatus ? 'verified' : 'unverified'} successfully`,
            });
            loadTeams();
        } else {
            toast({
                title: 'Error',
                description: 'Failed to update verification status',
                variant: 'destructive',
            });
        }
    }

    function TeamCard({ team }: { team: TeamRegistration }) {
        return (
            <Card className="mb-4">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">{team.teamName}</h3>
                            <p className="text-sm text-muted-foreground">
                                Registered on {format(new Date(team.createdAt), 'PPP')}
                            </p>
                        </div>
                        <Badge variant={team.isVerified ? 'default' : 'secondary'}>
                            {team.isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                    </div>

                    <div className="grid gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Captain:</span>
                            <span className="font-medium">{team.captainName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Contact:</span>
                            <span className="font-medium">{team.contactNo}</span>
                            {team.altContactNo && <span className="text-muted-foreground">/ {team.altContactNo}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Category:</span>
                            <Badge variant="outline">{team.category}</Badge>
                        </div>
                        {team.transactionId && (
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Transaction ID:</span>
                                <span className="font-mono text-xs">{team.transactionId}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex gap-2">
                        {team.isVerified ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVerify(team.sport, team.id, team.isVerified)}
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Unverify
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => handleVerify(team.sport, team.id, team.isVerified)}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Verify
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto max-w-6xl py-12 px-4">
                <p className="text-center">Loading registrations...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-6xl py-12 px-4">
            <div className="mb-8">
                <h1 className="text-4xl font-headline font-bold">Team Registrations</h1>
                <p className="text-muted-foreground mt-2">
                    View and verify all team registrations
                </p>
            </div>

            <Tabs defaultValue="volleyball" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="volleyball">
                        Volleyball ({volleyballTeams.length})
                    </TabsTrigger>
                    <TabsTrigger value="basketball">
                        Basketball ({basketballTeams.length})
                    </TabsTrigger>
                    <TabsTrigger value="carrom">
                        Carrom ({carromTeams.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="volleyball" className="mt-6">
                    {volleyballTeams.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No volleyball teams registered yet
                            </CardContent>
                        </Card>
                    ) : (
                        volleyballTeams.map((team) => <TeamCard key={team.id} team={team} />)
                    )}
                </TabsContent>

                <TabsContent value="basketball" className="mt-6">
                    {basketballTeams.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No basketball teams registered yet
                            </CardContent>
                        </Card>
                    ) : (
                        basketballTeams.map((team) => <TeamCard key={team.id} team={team} />)
                    )}
                </TabsContent>

                <TabsContent value="carrom" className="mt-6">
                    {carromTeams.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No carrom teams registered yet
                            </CardContent>
                        </Card>
                    ) : (
                        carromTeams.map((team) => <TeamCard key={team.id} team={team} />)
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
