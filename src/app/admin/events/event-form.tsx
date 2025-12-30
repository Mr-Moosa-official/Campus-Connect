"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/lib/types";
import { createEvent, updateEvent } from "@/lib/actions";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { format } from 'date-fns';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  location: z.string().min(3, "Location is required."),
  organizer: z.string().min(3, "Organizer is required."),
  imageId: z.string({ required_error: "Please select an image." }),
});

type EventFormProps = {
  event?: Event;
};

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event
      ? { ...event, date: format(new Date(event.date), "yyyy-MM-dd'T'HH:mm") }
      : { name: "", description: "", date: "", location: "", organizer: "", imageId: "" },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const action = event ? updateEvent.bind(null, event.id) : createEvent;
    const result = await action(formData);

    if (result?.success) {
      toast({
        title: `Event ${event ? 'Updated' : 'Created'}!`,
        description: `The event "${values.name}" has been successfully saved.`,
      });
      router.push('/admin/events');
    } else {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event ? "Edit Event" : "Create New Event"}</CardTitle>
        <CardDescription>Fill in the details for the campus event.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Tech Conference 2024" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date and Time</FormLabel>
                    <FormControl><Input type="datetime-local" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Describe the event..." className="min-h-[100px]" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="e.g., Main Auditorium" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organizer</FormLabel>
                    <FormControl><Input placeholder="e.g., Computer Science Dept." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="imageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Image</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a cover image" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PlaceHolderImages.map(img => (
                           <SelectItem key={img.id} value={img.id}>{img.description}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="flex justify-end gap-4">
               <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
               <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Event"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
