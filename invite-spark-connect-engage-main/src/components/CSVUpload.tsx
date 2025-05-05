
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseCSV, generateSampleCSV, downloadCSV, Recipient } from "@/utils/csvUtils";
import { useToast } from "@/components/ui/use-toast";

interface CSVUploadProps {
  onRecipientsLoaded: (recipients: Recipient[]) => void;
}

const CSVUpload = ({ onRecipientsLoaded }: CSVUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a .csv file');
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const recipients = parseCSV(csvText);
        
        if (recipients.length === 0) {
          throw new Error('No valid recipients found in the CSV file');
        }
        
        onRecipientsLoaded(recipients);
        toast({
          title: "CSV Upload Successful",
          description: `Loaded ${recipients.length} recipients from the CSV file.`,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading the file');
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    const sampleCSV = generateSampleCSV();
    downloadCSV(sampleCSV, 'sample_recipients.csv');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Recipient List</CardTitle>
        <CardDescription>
          Upload a CSV file containing your recipients' details.
          The CSV should include name, email, organization, role, and achievement columns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drag and drop your CSV file here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse files
              </p>
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Select CSV File"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleDownloadSample}>
          Download Sample CSV
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CSVUpload;
