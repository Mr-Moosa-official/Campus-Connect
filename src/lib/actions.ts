"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { events, users, certificates } from './data';
import { generateEventCertificates } from '@/ai/flows/generate-event-certificates';

const eventSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  date: z.string(),
  location: z.string().min(3),
  organizer: z.string().min(3),
  imageId: z.string(),
});

export async function createEvent(formData: FormData) {
  const validatedFields = eventSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const newEvent = {
    id: `event${events.length + 1}`,
    ...validatedFields.data,
    date: new Date(validatedFields.data.date).toISOString(),
  };

  events.push(newEvent);
  revalidatePath('/admin/events');
  return { success: true };
}

export async function updateEvent(id: string, formData: FormData) {
    const validatedFields = eventSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex > -1) {
        events[eventIndex] = {
            ...events[eventIndex],
            ...validatedFields.data,
            date: new Date(validatedFields.data.date).toISOString(),
        }
    }

    revalidatePath('/admin/events');
    revalidatePath(`/admin/events/${id}/edit`);
    return { success: true };
}

export async function generateCertificatesForAttendees(eventId: string, attendeeIds: string[]) {
  const event = events.find(e => e.id === eventId);
  if (!event) throw new Error("Event not found");

  const certificateTemplate = `
    <div style="border: 10px solid #673AB7; padding: 50px; text-align: center; background-color: #f3e5f5; font-family: 'PT Sans', sans-serif;">
      <h1 style="color: #4527a0;">Certificate of Attendance</h1>
      <p style="font-size: 20px; margin: 20px 0;">This is to certify that</p>
      <h2 style="color: #FFAB40; font-size: 36px; margin: 0;">{{attendeeName}}</h2>
      <p style="font-size: 20px; margin: 20px 0;">successfully attended the</p>
      <h3 style="font-size: 28px; color: #4527a0; margin: 0;">{{eventName}}</h3>
      <p style="font-size: 18px; margin-top: 20px;">on {{eventDate}}</p>
    </div>
  `;

  let count = 0;
  for (const studentId of attendeeIds) {
    const student = users.find(u => u.id === studentId);
    if (student) {
      try {
        const result = await generateEventCertificates({
          attendeeName: student.name,
          eventName: event.name,
          eventDate: new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          certificateTemplate,
        });

        certificates.push({
            id: `cert${certificates.length + 1}`,
            eventId: event.id,
            studentId: student.id,
            issuedAt: new Date().toISOString(),
            content: result.certificate,
        });
        count++;

      } catch (error) {
        console.error(`Failed to generate certificate for ${student.name}:`, error);
      }
    }
  }

  revalidatePath('/student/certificates');
  return { generatedCount: count };
}
