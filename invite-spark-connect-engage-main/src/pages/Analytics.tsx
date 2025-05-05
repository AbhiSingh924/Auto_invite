
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/Dashboard";
import RecipientTable from "@/components/RecipientTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { downloadCSV, exportToCSV, Recipient } from "@/utils/csvUtils";

// Sample data for demonstration
const sampleRecipients: Recipient[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    organization: "Acme Corp",
    role: "CTO",
    achievement: "Led digital transformation",
    status: "rsvp"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    organization: "Tech Innovators",
    role: "Research Director",
    achievement: "Published groundbreaking AI research",
    status: "opened"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    organization: "Global Solutions",
    role: "VP Marketing",
    achievement: "Increased market share by 35%",
    status: "clicked"
  },
  {
    id: "4",
    name: "Sarah Brown",
    email: "sarah@example.com",
    organization: "Future Institute",
    role: "Professor",
    achievement: "Awarded prestigious fellowship",
    status: "sent"
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    organization: "Tech Innovators",
    role: "Senior Developer",
    achievement: "Created patent-pending algorithm",
    status: "pending"
  },
  {
    id: "6",
    name: "Emily Garcia",
    email: "emily@example.com",
    organization: "Global Solutions",
    role: "Design Lead",
    achievement: "Won industry design award",
    status: "unsubscribed"
  },
  {
    id: "7",
    name: "Robert Chen",
    email: "robert@example.com",
    organization: "Acme Corp",
    role: "Project Manager",
    achievement: "Delivered $2M project under budget",
    status: "rsvp"
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa@example.com",
    organization: "Future Institute",
    role: "Department Head",
    achievement: "Secured $5M in research grants",
    status: "opened"
  },
];

const Analytics = () => {
  const [recipients] = useState<Recipient[]>(sampleRecipients);
  
  const handleExportData = () => {
    const csvContent = exportToCSV(recipients);
    downloadCSV(csvContent, "invitation_campaign_data.csv");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Campaign Analytics</h1>
                <p className="text-muted-foreground">
                  Track performance metrics for your invitation campaign
                </p>
              </div>
              <Button onClick={handleExportData}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export Data
              </Button>
            </div>
            
            <Tabs defaultValue="dashboard">
              <TabsList className="mb-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="recipients">Recipients</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <Dashboard recipients={recipients} />
              </TabsContent>
              
              <TabsContent value="recipients">
                <RecipientTable recipients={recipients} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
