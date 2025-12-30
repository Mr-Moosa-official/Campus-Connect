import { events, registrations, users } from "@/lib/data";
import { notFound } from "next/navigation";
import { AttendanceForm } from "./attendance-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AttendancePage({ params }: { params: { id: string } }) {
  const event = events.find(e => e.id === params.id);
  if (!event) {
    notFound();
  }

  const eventRegistrations = registrations.filter(r => r.eventId === event.id);
  const registeredStudents = eventRegistrations.map(r => {
    return users.find(u => u.id === r.studentId);
  }).filter(u => u !== undefined);

  return (
    <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <Button asChild variant="outline" className="mb-4">
                    <Link href="/admin/events">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Events
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Attendance for "{event.name}"</h1>
                <p className="text-muted-foreground">Select the students who attended the event.</p>
            </div>
      </div>
      <AttendanceForm event={event} registeredStudents={registeredStudents as any[]} />
    </div>
  );
}
