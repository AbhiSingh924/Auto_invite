
import { useState } from "react";
import { Recipient } from "@/utils/csvUtils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CSVUpload from "@/components/CSVUpload";
import RecipientTable from "@/components/RecipientTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Upload = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const handleRecipientsLoaded = (newRecipients: Recipient[]) => {
    setRecipients(newRecipients);
  };

  const handleSendEmails = () => {
    // In a real implementation, this would connect to a backend
    toast({
      title: "Backend functionality required",
      description: "To send emails, this app needs to be connected to a backend service.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Upload Recipients</h1>
              <p className="text-muted-foreground">
                Upload a CSV file with your recipient details to start your invitation campaign.
              </p>
            </div>
            
            <CSVUpload onRecipientsLoaded={handleRecipientsLoaded} />
            
            {recipients.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Recipients ({recipients.length})</h2>
                  <Button onClick={handleSendEmails}>
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
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                    Send Campaign
                  </Button>
                </div>
                
                <RecipientTable recipients={recipients} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
