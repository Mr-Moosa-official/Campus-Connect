import { events } from '@/lib/data';
import { EventCard } from '@/components/event-card';

export default function AllEventsPage() {
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter(event => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">All Campus Events</h1>
      
      <section>
        <h2 className="text-2xl font-semibold font-headline mb-6 border-b pb-2">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} baseUrl="/student" />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming events scheduled.</p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold font-headline mb-6 border-b pb-2">Past Events</h2>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} baseUrl="/student" />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No past events found.</p>
        )}
      </section>
    </div>
  );
}
