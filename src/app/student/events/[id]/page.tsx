import { events, registrations } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User, Clock } from 'lucide-react';

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = events.find(e => e.id === params.id);
  
  if (!event) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="text-muted-foreground">The event you are looking for does not exist.</p>
      </div>
    );
  }
  
  const currentUser = { id: 'user1' }; // Mock current user
  const isRegistered = registrations.some(r => r.eventId === event.id && r.studentId === currentUser.id);

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const placeholder = PlaceHolderImages.find(p => p.id === event.imageId);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder/1200/400";
  const imageHint = placeholder?.imageHint || "event placeholder";

  return (
    <div className="container mx-auto py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
        <Image 
          src={imageUrl} 
          alt={event.name} 
          fill 
          className="object-cover"
          data-ai-hint={imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold font-headline text-white">{event.name}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About this event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Date</h3>
                  <p className="text-muted-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Time</h3>
                  <p className="text-muted-foreground">{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Organizer</h3>
                  <p className="text-muted-foreground">{event.organizer}</p>
                </div>
              </div>
              
              <div className="pt-4">
                {isRegistered ? (
                  <Button disabled className="w-full">Already Registered</Button>
                ) : new Date(event.date) < new Date() ? (
                  <Button disabled className="w-full">Event has passed</Button>
                ) : (
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Register Now</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
