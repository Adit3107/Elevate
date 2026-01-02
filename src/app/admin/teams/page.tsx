'use client';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const initialTeams = {
  volleyball: [
    { id: 1, name: 'State University', captain: 'Alex Ray', registeredAt: new Date('2026-06-01T10:00:00Z'), transactionId: 'TXN123456789', verified: true },
    { id: 2, name: 'City College', captain: 'Ben Carter', registeredAt: new Date('2026-06-02T11:30:00Z'), transactionId: 'TXN987654321', verified: false },
    { id: 3, name: 'Tech Institute', captain: 'Casey Jones', registeredAt: new Date('2026-06-03T09:00:00Z'), transactionId: 'TXN555555555', verified: true },
  ],
  basketball: [
    { id: 1, name: 'Metro University', captain: 'Dylan Smith', registeredAt: new Date('2026-06-01T14:00:00Z'), transactionId: 'TXN112233445', verified: false },
    { id: 2, name: 'Community College', captain: 'Evan Williams', registeredAt: new Date('2026-06-02T16:45:00Z'), transactionId: 'TXN667788990', verified: true },
    { id: 3, name: 'Arts Academy', captain: 'Finn Brown', registeredAt: new Date('2026-06-04T12:00:00Z'), transactionId: 'TXN314159265', verified: false },
  ],
  carrom: [
    { id: 1, name: 'Science College', captain: 'Gale Hawthorne', registeredAt: new Date('2026-06-03T18:00:00Z'), transactionId: 'TXN271828182', verified: true },
    { id: 2, name: 'Business School', captain: 'Harry Potter', registeredAt: new Date('2026-06-04T20:00:00Z'), transactionId: 'TXN161803398', verified: true },
    { id: 3, name: 'Liberal Arts U', captain: 'Ian Wright', registeredAt: new Date('2026-06-05T13:15:00Z'), transactionId: 'TXN738905609', verified: false },
  ],
};

type Sport = keyof typeof initialTeams;
type Team = (typeof initialTeams)[Sport][0];


export default function ManageTeamsPage() {
    const [teamsData, setTeamsData] = useState(initialTeams);

  const handleVerificationChange = (sport: Sport, teamId: number, newVerifiedState: boolean) => {
    // This function will be responsible for updating the backend when it's integrated.
    // For now, it just updates the local state.
    setTeamsData(prevData => {
      const updatedSportTeams = prevData[sport].map(team =>
        team.id === teamId ? { ...team, verified: newVerifiedState } : team
      );
      return { ...prevData, [sport]: updatedSportTeams };
    });
  };

  const renderTeamTable = (sport: Sport) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Team Name</TableHead>
          <TableHead>Captain Name</TableHead>
          <TableHead>Date of Register</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead className="text-right">Verification</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamsData[sport].map((team: Team) => (
          <TableRow key={team.id}>
            <TableCell className="font-medium">{team.name}</TableCell>
            <TableCell>{team.captain}</TableCell>
            <TableCell>{format(new Date(team.registeredAt), "PPP")}</TableCell>
            <TableCell>
              <Badge variant="outline">{team.transactionId}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Switch
                id={`verification-${sport}-${team.id}`}
                checked={team.verified}
                onCheckedChange={(checked) => handleVerificationChange(sport, team.id, checked)}
                aria-label="Verification status"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Teams</CardTitle>
        <CardDescription>View and manage all registered teams for the tournament.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue='volleyball'>
          {(Object.keys(teamsData) as Sport[]).map((sport) => (
             <AccordionItem value={sport} key={sport}>
                <AccordionTrigger className="text-lg font-semibold capitalize">{sport}</AccordionTrigger>
                <AccordionContent>
                    {renderTeamTable(sport)}
                </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}