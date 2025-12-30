import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold text-primary">
            CampusConnect
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your hub for campus events and activities.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-center text-sm text-foreground">
            Please select your role to continue:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/student">I am a Student</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/admin">I am an Admin</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
