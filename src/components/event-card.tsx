import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Event } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type EventCardProps = {
  event: Event;
  baseUrl: '/student' | '/admin';
};

export function EventCard({ event, baseUrl }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const isPast = eventDate < new Date();

  const placeholder = PlaceHolderImages.find(p => p.id === event.imageId);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder/600/400";
  const imageHint = placeholder?.imageHint || "event placeholder";

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={event.name}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
          {isPast && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">PAST</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-2">{event.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
        <div className="w-full space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`${baseUrl}/events/${event.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
