import { certificates, events, users } from '@/lib/data';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Award, FileText } from 'lucide-react';

export default function MyCertificatesPage() {
  const currentUser = users.find(u => u.id === 'user1'); // Mock current user

  if (!currentUser) return <div>User not found.</div>;

  const myCertificates = certificates.filter(c => c.studentId === currentUser.id);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">My Certificates</h1>
      
      {myCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCertificates.map(certificate => {
            const event = events.find(e => e.id === certificate.eventId);
            return (
              <Card key={certificate.id}>
                <CardHeader>
                  <Award className="w-10 h-10 text-accent mb-2" />
                  <CardTitle>{event?.name || 'Event Certificate'}</CardTitle>
                  <CardDescription>
                    Issued on {new Date(certificate.issuedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/student/certificates/${certificate.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Certificate
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Alert>
          <Award className="h-4 w-4" />
          <AlertTitle>No Certificates Earned</AlertTitle>
          <AlertDescription>
            Attend events to earn certificates. Once you've attended an event and certificates are issued, they will appear here.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
