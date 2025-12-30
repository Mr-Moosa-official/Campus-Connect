import { events, registrations } from '@/lib/data';
import { EventCard } from '@/components/event-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Ticket } from 'lucide-react';
import Link from 'next/link';

export default function MyRegistrationsPage() {
  const currentUser = { id: 'user1' }; // Mock current user
  const myRegistrationIds = registrations
    .filter(r => r.studentId === currentUser.id)
    .map(r => r.eventId);
  
  const myEvents = events
    .filter(event => myRegistrationIds.includes(event.id))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">My Registrations</h1>
      
      {myEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map(event => (
            <EventCard key={event.id} event={event} baseUrl="/student" />
          ))}
        </div>
      ) : (
        <Alert>
          <Ticket className="h-4 w-4" />
          <AlertTitle>No Registered Events</AlertTitle>
          <AlertDescription>
            You haven't registered for any events yet. <Link href="/student/events" className="font-semibold underline">Explore upcoming events</Link> to find something exciting!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
