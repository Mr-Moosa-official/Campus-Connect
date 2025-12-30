import { events } from "@/lib/data";
import { EventForm } from "../../event-form";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditEventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
            <Button asChild variant="outline">
                <Link href="/admin/events">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Events
                </Link>
            </Button>
        </div>
        <EventForm event={event} />
      </div>
    </div>
  );
}
