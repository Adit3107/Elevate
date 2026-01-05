'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAllVolleyballTeams, getAllBasketballTeams, getAllCarromTeams, type TeamRegistration } from '@/actions/admin';

type CategoryFilter = 'all' | 'men' | 'women';

export default function ManageTeamsPage() {
  const [volleyballTeams, setVolleyballTeams] = useState<TeamRegistration[]>([]);
  const [basketballTeams, setBasketballTeams] = useState<TeamRegistration[]>([]);
  const [carromTeams, setCarromTeams] = useState<TeamRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

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

  const filterTeamsByCategory = (teams: TeamRegistration[]) => {
    if (categoryFilter === 'all') return teams;
    return teams.filter(team => team.category.toLowerCase() === categoryFilter);
  };

  const renderTeamTable = (teams: TeamRegistration[]) => {
    const filteredTeams = filterTeamsByCategory(teams);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Captain Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Verification Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTeams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                No teams registered yet
              </TableCell>
            </TableRow>
          ) : (
            filteredTeams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.teamName}</TableCell>
                <TableCell>{team.captainName}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                    {team.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={team.isVerified ? "default" : "secondary"}>
                    {team.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Manage Teams</CardTitle>
          <CardDescription>View and manage all registered teams for the tournament.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Loading teams...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Teams</CardTitle>
        <CardDescription>View and manage all registered teams for the tournament.</CardDescription>
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
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue='volleyball'>
          <AccordionItem value="volleyball">
            <AccordionTrigger className="text-lg font-semibold capitalize">
              Volleyball ({volleyballTeams.length})
            </AccordionTrigger>
            <AccordionContent>
              {renderTeamTable(volleyballTeams)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="basketball">
            <AccordionTrigger className="text-lg font-semibold capitalize">
              Basketball ({basketballTeams.length})
            </AccordionTrigger>
            <AccordionContent>
              {renderTeamTable(basketballTeams)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="carrom">
            <AccordionTrigger className="text-lg font-semibold capitalize">
              Carrom ({carromTeams.length})
            </AccordionTrigger>
            <AccordionContent>
              {renderTeamTable(carromTeams)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
