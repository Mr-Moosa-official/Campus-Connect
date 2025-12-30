"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateCertificatesForAttendees } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { Event, User } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

const FormSchema = z.object({
  attendees: z.array(z.string()),
});

type AttendanceFormProps = {
  event: Event;
  registeredStudents: User[];
};

export function AttendanceForm({ event, registeredStudents }: AttendanceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      attendees: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await generateCertificatesForAttendees(event.id, data.attendees);
      toast({
        title: "Certificates Generated!",
        description: `${result.generatedCount} certificates have been successfully created and are now available to students.`,
      });
    } catch (error) {
      toast({
        title: "Error Generating Certificates",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Attended</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredStudents.length > 0 ? registeredStudents.map((student) => (
                  <FormField
                    key={student.id}
                    control={form.control}
                    name="attendees"
                    render={({ field }) => (
                      <TableRow>
                        <TableCell>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(student.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, student.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== student.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                      </TableRow>
                    )}
                  />
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No students registered for this event.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {registeredStudents.length > 0 && <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {isSubmitting ? "Generating..." : "Generate Certificates"}
          </Button>
        </div>}
      </form>
    </Form>
  );
}
