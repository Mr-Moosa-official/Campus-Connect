import { events, users, registrations } from "@/lib/data";
import { StatCard } from "@/components/stat-card";
import { Users, Calendar, Ticket, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const totalEvents = events.length;
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalRegistrations = registrations.length;
  
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;

  const chartData = events.map(event => ({
    name: event.name.substring(0, 15) + (event.name.length > 15 ? '...' : ''),
    registrations: registrations.filter(r => r.eventId === event.id).length,
  })).sort((a,b) => b.registrations - a.registrations).slice(0, 5);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Total Events"
          value={totalEvents}
          icon={Calendar}
          description={`${upcomingEvents} upcoming`}
        />
        <StatCard 
          title="Total Students"
          value={totalStudents}
          icon={Users}
          description="Across all departments"
        />
        <StatCard 
          title="Total Registrations"
          value={totalRegistrations}
          icon={Ticket}
          description="For all events"
        />
        <StatCard 
          title="Avg. Registrations"
          value={(totalRegistrations / totalEvents).toFixed(1)}
          icon={BarChart}
          description="Per event"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Events by Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <RechartsBarChart data={chartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
