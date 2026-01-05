'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';
import { getVerifiedVolleyballTeams, getVerifiedBasketballTeams, getVerifiedCarromTeams, type TeamRegistration } from '@/actions/admin';

type CategoryFilter = 'all' | 'men' | 'women';

export default function TeamsPage() {
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
      getVerifiedVolleyballTeams(),
      getVerifiedBasketballTeams(),
      getVerifiedCarromTeams(),
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

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <p className="text-center text-muted-foreground">Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <Users className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">
          Registered Teams
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Browse the teams competing in the Elevate tournament.
        </p>
        <div className="flex gap-2 mt-6">
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
      </div>

      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="volleyball">
              <AccordionTrigger className="text-lg font-semibold">Volleyball ({filterTeamsByCategory(volleyballTeams).length})</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Captain Name</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterTeamsByCategory(volleyballTeams).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No verified volleyball teams in this category
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterTeamsByCategory(volleyballTeams).map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{team.teamName}</TableCell>
                          <TableCell>{team.captainName}</TableCell>
                          <TableCell>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                              {team.category}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="basketball">
              <AccordionTrigger className="text-lg font-semibold">Basketball ({filterTeamsByCategory(basketballTeams).length})</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Captain Name</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterTeamsByCategory(basketballTeams).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No verified basketball teams in this category
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterTeamsByCategory(basketballTeams).map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{team.teamName}</TableCell>
                          <TableCell>{team.captainName}</TableCell>
                          <TableCell>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                              {team.category}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="carrom">
              <AccordionTrigger className="text-lg font-semibold">Carrom ({filterTeamsByCategory(carromTeams).length})</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Captain Name</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterTeamsByCategory(carromTeams).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No verified carrom teams in this category
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterTeamsByCategory(carromTeams).map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{team.teamName}</TableCell>
                          <TableCell>{team.captainName}</TableCell>
                          <TableCell>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                              {team.category}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
