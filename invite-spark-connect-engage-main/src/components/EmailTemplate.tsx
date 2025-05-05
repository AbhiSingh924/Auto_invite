
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface EmailTemplateProps {
  previewData?: {
    name: string;
    email: string;
    organization: string;
    role: string;
    achievement: string;
  };
  onSave: (template: {
    subject: string;
    body: string;
  }) => void;
}

const EmailTemplate = ({ previewData, onSave }: EmailTemplateProps) => {
  const [subject, setSubject] = useState<string>("Invitation to VBDA 2025");
  const [body, setBody] = useState<string>(
    `Dear {name},

We are pleased to invite you to the Virtual Business Development Awards (VBDA) 2025.

{personalized_hook}

The event will be held on June 15th, 2025, from 7:00 PM to 10:00 PM EST. 

Please RSVP by clicking the link below:
{rsvp_link}

We look forward to your participation.

Best regards,
The VBDA Team

{unsubscribe_link}`
  );
  const { toast } = useToast();

  const handleInsertPlaceholder = (placeholder: string) => {
    const textarea = document.getElementById("email-body") as HTMLTextAreaElement;
    
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      
      const newValue = 
        body.substring(0, startPos) + 
        `{${placeholder}}` + 
        body.substring(endPos);
      
      setBody(newValue);
      
      // Set cursor position after inserted placeholder
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = startPos + placeholder.length + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const renderPreview = () => {
    if (!previewData) {
      return body;
    }
    
    let preview = body;
    
    // Replace known placeholders
    preview = preview.replace(/{name}/g, previewData.name);
    preview = preview.replace(/{email}/g, previewData.email);
    preview = preview.replace(/{organization}/g, previewData.organization);
    preview = preview.replace(/{role}/g, previewData.role);
    preview = preview.replace(/{achievement}/g, previewData.achievement);
    
    // Example placeholder values for demo
    preview = preview.replace(/{personalized_hook}/g, 
      `Your ${previewData.role} position at ${previewData.organization} and your achievement in ${previewData.achievement} make you an ideal participant for this prestigious event.`
    );
    preview = preview.replace(/{rsvp_link}/g, "[RSVP Link]");
    preview = preview.replace(/{unsubscribe_link}/g, "[Unsubscribe Link]");
    
    return preview;
  };

  const handleSave = () => {
    onSave({ subject, body });
    toast({
      title: "Template Saved",
      description: "Your email template has been saved successfully."
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Email Template Editor</CardTitle>
          <CardDescription>
            Design your email template with dynamic placeholders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-body">Email Body</Label>
            <Textarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter email body"
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>Available Placeholders</Label>
            <div className="flex flex-wrap gap-2">
              {["name", "email", "organization", "role", "achievement", "personalized_hook", "rsvp_link", "unsubscribe_link"].map((placeholder) => (
                <Badge 
                  key={placeholder}
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleInsertPlaceholder(placeholder)}
                >
                  {placeholder}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Template</Button>
        </CardFooter>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Email Preview</CardTitle>
          <CardDescription>
            {previewData 
              ? `Preview for ${previewData.name} (${previewData.email})` 
              : "How your email will look to recipients"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="border shadow-sm">
            <CardHeader className="bg-secondary/50 p-4">
              <div className="space-y-1.5">
                <div className="font-semibold">
                  {subject.replace(/{name}/g, previewData?.name || "{name}")}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>From: VBDA Team &lt;invites@vbda2025.com&gt;</span>
                  <span>•</span>
                  <span>To: {previewData?.email || "recipient@example.com"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="whitespace-pre-line font-sans text-sm">
                {renderPreview()}
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Test Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailTemplate;
