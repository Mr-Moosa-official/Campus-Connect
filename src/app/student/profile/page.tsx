import { users } from "@/lib/data";
import { ProfileForm } from "./profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const currentUser = users.find((u) => u.id === 'user1'); // Mock current user

  if (!currentUser) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Update your event preferences to get personalized recommendations. Tell us what you're interested in, like "technology, art, music, career development".
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={currentUser} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
