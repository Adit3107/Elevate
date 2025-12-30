import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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


export default function ManageTeamsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Teams</CardTitle>
        <CardDescription>View and manage all registered teams for the tournament.</CardDescription>
      </CardHeader>
      <CardContent>
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
  );
}
