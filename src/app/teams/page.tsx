
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
    { id: 1, name: 'Spiking Spartans', college: 'State University' },
    { id: 2, name: 'Net Ninjas', college: 'City College' },
    { id: 3, name: 'Court Kings', college: 'Tech Institute' },
  ],
  basketball: [
    { id: 1, name: 'Dunking Dragons', college: 'Metro University' },
    { id: 2, name: 'Hoop Heroes', college: 'Community College' },
    { id: 3, name: 'Rebound Rulers', college: 'Arts Academy' },
  ],
  carrom: [
    { id: 1, name: 'Pocket Protectors', college: 'Science College' },
    { id: 2, name: 'Striker Syndicate', college: 'Business School' },
    { id: 3, name: 'Queen Collectors', college: 'Liberal Arts U' },
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
                      <TableHead>College</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTeams.volleyball.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.college}</TableCell>
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
                      <TableHead>College</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTeams.basketball.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.college}</TableCell>
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
                      <TableHead>College</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTeams.carrom.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.college}</TableCell>
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
