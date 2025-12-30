"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { User } from "@/lib/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  profile: z.string().min(10, "Please tell us a bit more about your interests.").max(500, "Profile is too long."),
});

type ProfileFormProps = {
  user: User;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile: user.profile || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd call a server action to save this to the database.
    // For this mock, we'll just show a toast and refresh the page to show AI changes.
    console.log("Updated profile:", values.profile);
    // This is where you would mutate the `users` object in a real backend.
    const userIndex = user.id === 'user1' ? 0 : -1; // Find user index to update mock data
    if (userIndex !== -1) {
        // This mutation won't persist across requests in a serverless env, but shows the concept
        // users[userIndex].profile = values.profile;
    }
    
    toast({
      title: "Profile Updated!",
      description: "Your event feed will now be personalized based on your interests.",
    });

    // Refresh the page to re-trigger the AI recommendation on the dashboard
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>My Event Preferences</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., I'm interested in AI, hackathons, live music, and startup culture."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
