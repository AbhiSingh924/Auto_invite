
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/Dashboard";
import { Recipient } from "@/utils/csvUtils";

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
];

const Index = () => {
  const [recipients] = useState<Recipient[]>(sampleRecipients);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-800">
                InviteSpark
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Streamline event invitations with personalized content and automated follow-ups
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="mr-4">
                  <Link to="/upload">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/analytics">View Analytics</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="CSV Upload"
                description="Easily import your recipient details including names, emails, and personalization data."
                icon={<UploadIcon />}
                link="/upload"
              />
              <FeatureCard
                title="Personalized Templates"
                description="Create email templates with dynamic content powered by recipient data."
                icon={<TemplateIcon />}
                link="/template"
              />
              <FeatureCard
                title="Campaign Analytics"
                description="Track opens, clicks, and RSVPs with detailed visualizations."
                icon={<AnalyticsIcon />}
                link="/analytics"
              />
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <Dashboard recipients={recipients} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard = ({ title, description, icon, link }: FeatureCardProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="p-2 w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="ghost" className="group">
          <Link to={link}>
            Learn more{" "}
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
              className="ml-1 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-brand-600"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const TemplateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-brand-600"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-brand-600"
  >
    <path d="M21 21H3"></path>
    <path d="M21 21V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8V21"></path>
    <path d="M9 8v13"></path>
    <path d="M15 5v16"></path>
  </svg>
);

export default Index;
