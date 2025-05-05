
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmailTemplate from "@/components/EmailTemplate";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Template = () => {
  const [emailTemplate, setEmailTemplate] = useState({
    subject: "Invitation to VBDA 2025",
    body: ""
  });

  const previewData = {
    name: "John Doe",
    email: "john@example.com",
    organization: "Acme Corp",
    role: "CTO",
    achievement: "Led digital transformation",
  };

  const handleSaveTemplate = (template: { subject: string; body: string }) => {
    setEmailTemplate(template);
    toast({
      title: "Template Saved Successfully",
      description: "Your email template has been saved and is ready to use.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Email Template</h1>
              <p className="text-muted-foreground">
                Design personalized email templates for your invitation campaign.
              </p>
            </div>
            
            <Tabs defaultValue="editor">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Template Editor</TabsTrigger>
                <TabsTrigger value="scheduling">Send & Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor">
                <EmailTemplate previewData={previewData} onSave={handleSaveTemplate} />
              </TabsContent>
              
              <TabsContent value="scheduling">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Campaign</CardTitle>
                      <CardDescription>
                        Configure sending options for your email campaign
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Initial Invitation</h3>
                        <p className="text-sm text-muted-foreground">
                          Send the initial invitation email to all recipients
                        </p>
                      </div>
                      <Button className="w-full">
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
                          <path d="M22 2 11 13"></path>
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                        </svg>
                        Send Invitation (Day 1)
                      </Button>
                    </CardContent>
                    <CardFooter className="border-t pt-6">
                      <p className="text-sm text-muted-foreground">
                        All emails will be sent using the saved template.
                      </p>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Schedule Follow-ups</CardTitle>
                      <CardDescription>
                        Set up automated reminders for non-responders
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm font-medium mb-1">First Follow-up (Day 5)</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sent to recipients who haven't responded to the initial invitation
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Schedule
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm font-medium mb-1">Final Reminder (Day 10)</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Last reminder sent to recipients who still haven't responded
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6">
                      <div className="text-sm text-muted-foreground">
                        <p>Follow-ups will only be sent to non-responders.</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Template;
