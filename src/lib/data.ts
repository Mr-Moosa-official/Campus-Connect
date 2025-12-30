import type { User, Event, Registration, Certificate } from './types';

export const users: User[] = [
  { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student', profile: 'Interested in technology, coding, and entrepreneurship. Loves hackathons and workshops.' },
  { id: 'user2', name: 'Bob Williams', email: 'bob@example.com', role: 'student', profile: 'A passionate artist and musician. Enjoys exhibitions, concerts, and creative workshops.' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'student', profile: 'Focused on career development and networking. Attends job fairs and business talks.' },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', role: 'student' },
  { id: 'admin1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

export const events: Event[] = [
  { id: 'event1', name: 'Future of Tech Conference', description: 'A deep dive into AI, blockchain, and quantum computing. Network with industry leaders.', date: '2024-10-15T09:00:00', location: 'Main Auditorium', organizer: 'Computer Science Dept.', imageId: 'tech-conference' },
  { id: 'event2', name: 'Annual Art Exhibition', description: 'Showcasing the best student artwork from the past year. Includes paintings, sculptures, and digital art.', date: '2024-11-05T18:00:00', location: 'Fine Arts Gallery', organizer: 'Arts & Culture Club', imageId: 'art-exhibition' },
  { id: 'event3', name: 'Campus Music Festival', description: 'An outdoor festival featuring student bands and local artists. Food trucks and fun activities all day.', date: '2024-09-28T14:00:00', location: 'Central Lawn', organizer: 'Student Union', imageId: 'music-festival' },
  { id: 'event4', name: 'Fall Career Fair', description: 'Connect with over 50 companies from various industries. Bring your resume and dress to impress.', date: '2024-10-02T10:00:00', location: 'Grand Ballroom', organizer: 'Career Services', imageId: 'career-fair' },
  { id: 'event5', name: '24-Hour Hackathon', description: 'Build a project from scratch and compete for prizes. Open to all skill levels. Mentors will be available.', date: '2024-11-12T17:00:00', location: 'Engineering Building', organizer: 'Dev Club', imageId: 'coding-hackathon' },
  { id: 'event6', name: 'Intro to Robotics Workshop', description: 'A hands-on workshop where you will build and program your first robot. No prior experience required.', date: '2024-10-22T13:00:00', location: 'Innovation Hub', organizer: 'Robotics Club', imageId: 'robotics-workshop' },
  { id: 'event7', name: 'Entrepreneurship Summit', description: 'Hear from successful founders and VCs. Pitch your startup idea and get valuable feedback.', date: '2024-11-20T09:00:00', location: 'Business School Auditorium', organizer: 'E-Cell', imageId: 'entrepreneurship-summit' },
  { id: 'event8', name: 'Literary Fest 2024', description: 'A celebration of words. Join author talks, poetry slams, and creative writing workshops.', date: '2024-10-19T11:00:00', location: 'Library Complex', organizer: 'Literature Society', imageId: 'literary-fest' },
];

export const registrations: Registration[] = [
  { id: 'reg1', eventId: 'event1', studentId: 'user1', status: 'registered' },
  { id: 'reg2', eventId: 'event5', studentId: 'user1', status: 'registered' },
  { id: 'reg3', eventId: 'event7', studentId: 'user1', status: 'registered' },
  { id: 'reg4', eventId: 'event2', studentId: 'user2', status: 'registered' },
  { id: 'reg5', eventId: 'event3', studentId: 'user2', status: 'registered' },
  { id: 'reg6', eventId: 'event4', studentId: 'user3', status: 'registered' },
  { id: 'reg7', eventId: 'event1', studentId: 'user3', status: 'registered' },
  { id: 'reg8', eventId: 'event5', studentId: 'user2', status: 'registered' },
];

export let certificates: Certificate[] = [
    {
        id: 'cert1',
        eventId: 'event1',
        studentId: 'user1',
        issuedAt: '2024-10-16T10:00:00',
        content: `
    <div style="border: 10px solid #673AB7; padding: 50px; text-align: center; background-color: #f3e5f5;">
      <h1 style="color: #4527a0; font-family: 'PT Sans', sans-serif;">Certificate of Attendance</h1>
      <p style="font-size: 20px; font-family: 'PT Sans', sans-serif; margin: 20px 0;">This is to certify that</p>
      <h2 style="color: #FFAB40; font-size: 36px; font-family: 'PT Sans', sans-serif; margin: 0;">Alice Johnson</h2>
      <p style="font-size: 20px; font-family: 'PT Sans', sans-serif; margin: 20px 0;">successfully attended the</p>
      <h3 style="font-size: 28px; font-family: 'PT Sans', sans-serif; margin: 0; color: #4527a0;">Future of Tech Conference</h3>
      <p style="font-size: 18px; font-family: 'PT Sans', sans-serif; margin-top: 20px;">on October 15, 2024</p>
    </div>
    `
    }
];
