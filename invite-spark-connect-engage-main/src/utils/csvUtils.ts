
export interface Recipient {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  achievement: string;
  status?: 'pending' | 'sent' | 'opened' | 'clicked' | 'rsvp' | 'unsubscribed';
}

export const parseCSV = (csvText: string): Recipient[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Check required headers
  const requiredHeaders = ['name', 'email', 'organization', 'role', 'achievement'];
  const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
  
  if (missingHeaders.length > 0) {
    throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
  }
  
  const recipients: Recipient[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',').map(value => value.trim());
    
    if (values.length !== headers.length) {
      console.warn(`Skipping row ${i + 1}: incorrect number of fields`);
      continue;
    }
    
    const recipient: any = {
      id: `rec_${Date.now()}_${i}`,
      status: 'pending'
    };
    
    headers.forEach((header, index) => {
      recipient[header] = values[index];
    });
    
    recipients.push(recipient as Recipient);
  }
  
  return recipients;
};

export const exportToCSV = (recipients: Recipient[]): string => {
  const headers = ['name', 'email', 'organization', 'role', 'achievement', 'status'];
  const csvContent = [
    headers.join(','),
    ...recipients.map(recipient => 
      headers.map(header => recipient[header as keyof Recipient]).join(',')
    )
  ].join('\n');
  
  return csvContent;
};

export const downloadCSV = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const generateSampleCSV = (): string => {
  return `name,email,organization,role,achievement
John Doe,john@example.com,Acme Corp,CTO,Led digital transformation
Jane Smith,jane@example.com,Tech Innovators,Research Director,Published groundbreaking AI research
Michael Johnson,michael@example.com,Global Solutions,VP Marketing,Increased market share by 35%
Sarah Brown,sarah@example.com,Future Institute,Professor,Awarded prestigious fellowship`;
};
