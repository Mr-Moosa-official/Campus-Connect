export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  profile?: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  imageId: string;
};

export type Registration = {
  id: string;
  eventId: string;
  studentId: string;
  status: 'registered' | 'waitlisted';
};

export type Certificate = {
  id: string;
  eventId: string;
  studentId: string;
  issuedAt: string;
  content: string;
};
