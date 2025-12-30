import Link from "next/link";
import { events, registrations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Users } from "lucide-react";
import { EventActions } from "./event-actions";

export default function ManageEventsPage() {
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Manage Events</h1>
        <Button asChild>
          <Link href="/admin/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>A list of all events on campus.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Registrations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map(event => {
                const eventDate = new Date(event.date);
                const isPast = eventDate < new Date();
                const registrationCount = registrations.filter(r => r.eventId === event.id).length;

                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                    </TableCell>
                    <TableCell>
                      {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={isPast ? "destructive" : "default"}>
                        {isPast ? "Past" : "Upcoming"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{registrationCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <EventActions eventId={event.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
