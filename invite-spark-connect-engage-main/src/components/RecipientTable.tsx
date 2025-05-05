
import { useState } from "react";
import { Recipient, downloadCSV, exportToCSV } from "@/utils/csvUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface RecipientTableProps {
  recipients: Recipient[];
  onSelectRecipient?: (recipient: Recipient) => void;
}

const RecipientTable = ({ recipients, onSelectRecipient }: RecipientTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const statusColors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    opened: "bg-purple-100 text-purple-800",
    clicked: "bg-yellow-100 text-yellow-800",
    rsvp: "bg-green-100 text-green-800",
    unsubscribed: "bg-red-100 text-red-800",
  };

  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRecipients = filteredRecipients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredRecipients.length / rowsPerPage);

  const handleDownloadCSV = () => {
    const csvContent = exportToCSV(recipients);
    downloadCSV(csvContent, "recipients_export.csv");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Input
          placeholder="Search recipients..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={handleDownloadCSV}>
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export to CSV
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Organization</TableHead>
              <TableHead className="hidden lg:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecipients.length > 0 ? (
              paginatedRecipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell className="font-medium">{recipient.name}</TableCell>
                  <TableCell>{recipient.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{recipient.organization}</TableCell>
                  <TableCell className="hidden lg:table-cell">{recipient.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[recipient.status || "pending"]}>
                      {recipient.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectRecipient && onSelectRecipient(recipient)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No recipients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientTable;
