
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Recipient } from "@/utils/csvUtils";

interface DashboardProps {
  recipients: Recipient[];
}

const Dashboard = ({ recipients }: DashboardProps) => {
  // Calculate stats
  const totalRecipients = recipients.length;
  const sentEmails = recipients.filter(r => r.status !== 'pending').length;
  const openedEmails = recipients.filter(r => ['opened', 'clicked', 'rsvp'].includes(r.status || '')).length;
  const clickedEmails = recipients.filter(r => ['clicked', 'rsvp'].includes(r.status || '')).length;
  const rsvpCount = recipients.filter(r => r.status === 'rsvp').length;
  const unsubscribed = recipients.filter(r => r.status === 'unsubscribed').length;

  // Prepare data for pie chart
  const pieData = [
    { name: 'Unsubscribed', value: unsubscribed, color: '#ef4444' },
    { name: 'Pending', value: totalRecipients - sentEmails, color: '#9ca3af' },
    { name: 'Sent (No Open)', value: sentEmails - openedEmails, color: '#60a5fa' },
    { name: 'Opened (No Click)', value: openedEmails - clickedEmails, color: '#a855f7' },
    { name: 'Clicked (No RSVP)', value: clickedEmails - rsvpCount, color: '#f59e0b' },
    { name: 'RSVP', value: rsvpCount, color: '#10b981' },
  ].filter(item => item.value > 0);

  // Prepare data for bar chart
  const barData = [
    { name: 'Sent', value: sentEmails, fill: '#3b82f6' },
    { name: 'Opened', value: openedEmails, fill: '#8b5cf6' },
    { name: 'Clicked', value: clickedEmails, fill: '#f59e0b' },
    { name: 'RSVP', value: rsvpCount, fill: '#10b981' },
  ];

  // Group by organization
  const orgData = recipients.reduce((acc: Record<string, number>, recipient) => {
    const org = recipient.organization || 'Unknown';
    acc[org] = (acc[org] || 0) + 1;
    return acc;
  }, {});

  const organizationData = Object.entries(orgData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="responses">Response Rate</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Recipients" value={totalRecipients} />
            <StatCard title="Emails Sent" value={sentEmails} />
            <StatCard title="Emails Opened" value={openedEmails} />
            <StatCard title="RSVP Received" value={rsvpCount} />
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Response Breakdown</CardTitle>
                <CardDescription>Distribution of recipient responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
                <CardDescription>Key metrics for your email campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="responses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Rates</CardTitle>
              <CardDescription>Detailed breakdown of recipient actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <ProgressMetric 
                  label="Open Rate" 
                  value={sentEmails > 0 ? (openedEmails / sentEmails) * 100 : 0} 
                  description={`${openedEmails} of ${sentEmails} emails opened`}
                />
                <ProgressMetric 
                  label="Click Rate" 
                  value={openedEmails > 0 ? (clickedEmails / openedEmails) * 100 : 0} 
                  description={`${clickedEmails} of ${openedEmails} opened emails had clicks`}
                />
                <ProgressMetric 
                  label="RSVP Rate" 
                  value={clickedEmails > 0 ? (rsvpCount / clickedEmails) * 100 : 0} 
                  description={`${rsvpCount} of ${clickedEmails} recipients with clicks RSVP'd`}
                />
                <ProgressMetric 
                  label="Unsubscribe Rate" 
                  value={sentEmails > 0 ? (unsubscribed / sentEmails) * 100 : 0} 
                  description={`${unsubscribed} of ${sentEmails} recipients unsubscribed`}
                  isNegative
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Organizations</CardTitle>
              <CardDescription>Organizations with the most recipients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={organizationData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Recipients" fill="#4299E1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Timeline</CardTitle>
              <CardDescription>Response timeline for your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-80 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p>No campaign data available yet.</p>
                <p className="text-sm">Timeline will be available once emails are sent.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

interface ProgressMetricProps {
  label: string;
  value: number;
  description: string;
  isNegative?: boolean;
}

const ProgressMetric = ({ label, value, description, isNegative = false }: ProgressMetricProps) => {
  const formattedValue = value.toFixed(1);
  const progressClass = isNegative
    ? "bg-red-500"
    : value > 50
    ? "bg-green-500"
    : value > 25
    ? "bg-yellow-500"
    : "bg-blue-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{formattedValue}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${progressClass} rounded-full`}
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

export default Dashboard;
