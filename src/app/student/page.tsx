import { users, events } from "@/lib/data";
import { getPersonalizedEventRecommendations } from "@/ai/flows/personalized-event-recommendations";
import type { Event } from "@/lib/types";
import { EventCard } from "@/components/event-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getRecommendedEvents(
  studentProfile: string,
  allEvents: Event[]
): Promise<Event[]> {
  if (!studentProfile || studentProfile.trim() === "") {
    return allEvents.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= new Date());

  try {
    const eventDescriptions = upcomingEvents.map(
      (event) => `${event.name}: ${event.description}`
    );
    const recommendedOrder = await getPersonalizedEventRecommendations({
      studentProfile,
      events: eventDescriptions,
    });

    const eventMap = new Map(upcomingEvents.map(e => [`${e.name}: ${e.description}`, e]));
    
    return recommendedOrder.map(desc => eventMap.get(desc)).filter((e): e is Event => e !== undefined);

  } catch (error) {
    console.error("AI recommendation failed, returning default order:", error);
    return upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}

export default async function StudentDashboard() {
  const currentUser = users.find((u) => u.id === "user1"); // Mock current user
  if (!currentUser) return null;

  const recommendedEvents = await getRecommendedEvents(
    currentUser.profile || "",
    events
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">
        Welcome, {currentUser.name}!
      </h1>
      <p className="text-muted-foreground mb-8">
        Here are some upcoming events we think you'll love.
      </p>

      {!currentUser.profile && (
        <Alert className="mb-8 bg-accent/20 border-accent/50">
          <Sparkles className="h-4 w-4 text-accent" />
          <AlertTitle className="font-bold text-accent-foreground">Get Personalized Recommendations!</AlertTitle>
          <AlertDescription>
            <div className="flex justify-between items-center">
              <p>Set your interests in your profile to get event suggestions tailored just for you.</p>
              <Button asChild size="sm" variant="link" className="text-accent-foreground">
                <Link href="/student/profile">Update Profile</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {recommendedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.map((event) => (
            <EventCard key={event.id} event={event} baseUrl="/student" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h2 className="text-xl font-semibold">No Upcoming Events</h2>
          <p className="text-muted-foreground mt-2">
            Check back later for new and exciting events on campus!
          </p>
        </div>
      )}
    </div>
  );
}
