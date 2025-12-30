import { certificates, events, users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function CertificateDisplayPage({ params }: { params: { id: string } }) {
  const certificate = certificates.find(c => c.id === params.id);

  if (!certificate) {
    notFound();
  }

  const event = events.find(e => e.id === certificate.eventId);
  const student = users.find(u => u.id === certificate.studentId);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/student/certificates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Certificates
          </Link>
        </Button>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Certificate for {event?.name}</CardTitle>
          <CardDescription>
            Issued to {student?.name} on {new Date(certificate.issuedAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: certificate.content }}
          />
          <div className="mt-6 text-center">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
