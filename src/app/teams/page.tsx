
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';

const dummyTeams = {
  volleyball: [
    { id: 1, name: 'State University', captain: 'Alex Ray' },
    { id: 2, name: 'City College', captain: 'Ben Carter' },
    { id: 3, name: 'Tech Institute', captain: 'Casey Jones' },
  ],
  basketball: [
    { id: 1, name: 'Metro University', captain: 'Dylan Smith' },
    { id: 2, name: 'Community College', captain: 'Evan Williams' },
    { id: 3, name: 'Arts Academy', captain: 'Finn Brown' },
  ],
  carrom: [
    { id: 1, name: 'Science College', captain: 'Gale Hawthorne' },
    { id: 2, name: 'Business School', captain: 'Harry Potter' },
    { id: 3, name: 'Liberal Arts U', captain: 'Ian Wright' },
  ],
};


export default function TeamsPage() {
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
      </div>

      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="volleyball">
              <AccordionTrigger className="text-lg font-semibold">Volleyball</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Captain Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTeams.volleyball.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.captain}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="basketball">
              <AccordionTrigger className="text-lg font-semibold">Basketball</AccordionTrigger>
              <AccordionContent>
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Captain Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTeams.basketball.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.captain}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="carrom">
              <AccordionTrigger className="text-lg font-semibold">Carrom</AccordionTrigger>
              <AccordionContent>
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Captain Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTeams.carrom.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.captain}</TableCell>
                      </TableRow>
                    ))}
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
