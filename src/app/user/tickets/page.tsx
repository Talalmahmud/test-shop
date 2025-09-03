// app/dashboard/tickets/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

import { CreateTicketDialog } from "@/components/shared/create-ticket-dialog";
import { ViewTicketDialog } from "@/components/shared/view-ticket-dialog";
import { addTicket, getTickets } from "@/services/ticket";
export interface Ticket {
  id: number;
  code: string;
  user_id: number;
  subject: string;
  details: string;
  status: "open" | "pending" | "resolved" | "closed"; // enum-like union
  status_string: string;
  priority: "low" | "medium" | "high" | "urgent"; // enum-like union
  priority_string: string;
  attachments: string[]; // file URLs or IDs
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Mock data - replace with actual API calls
const mockTickets: Ticket[] = [
  {
    id: 1,
    code: "TICKET-001",
    user_id: 73,
    subject: "Payment issue with order #12345",
    details:
      "I'm having trouble with my payment for order #12345. The transaction failed but money was deducted from my account.",
    status: "open",
    status_string: "Open",
    priority: "high",
    priority_string: "High",
    attachments: ["receipt.pdf"],
    created_at: "2024-01-15T10:30:00.000Z",
    updated_at: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    code: "TICKET-002",
    user_id: 73,
    subject: "Product damaged during shipping",
    details:
      "The product I received was damaged. The packaging was torn and the item inside is broken.",
    status: "pending",
    status_string: "Pending",
    priority: "medium",
    priority_string: "Medium",
    attachments: ["damage1.jpg", "damage2.jpg"],
    created_at: "2024-01-10T14:20:00.000Z",
    updated_at: "2024-01-12T09:15:00.000Z",
  },
  {
    id: 3,
    code: "TICKET-003",
    user_id: 73,
    subject: "Account verification issue",
    details:
      "I'm unable to verify my email address. The verification link doesn't work.",
    status: "resolved",
    status_string: "Resolved",
    priority: "low",
    priority_string: "Low",
    attachments: [],
    created_at: "2024-01-05T08:45:00.000Z",
    updated_at: "2024-01-07T16:30:00.000Z",
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    const res = await getTickets();
    console.log(res);
    setTickets(res.data.data);
    setIsLoading(false);
  };

  const handleCreateTicket = async (ticketData: {
    subject: string;
    details: string;
    attachments: [];
  }) => {
    try {
      // Replace with actual API call: POST /support-tickets
      console.log("Creating ticket:", ticketData);

      // Simulate API response
      const newTicket = {
        subject: ticketData.subject,
        details: ticketData.details,

        attachments: ticketData.attachments || [],
      };
      const res = await addTicket(
        ticketData.subject,
        ticketData.details,
        ticketData.attachments
      );
      fetchTickets();
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "open":
        return "destructive";
      case "pending":
        return "secondary";
      case "resolved":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-10 bg-muted rounded mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">
            Manage your support requests and get help
          </p>
        </div>

        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No support tickets yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Create your first support ticket to get help with any issues
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create Ticket
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {ticket.subject}
                      </h3>
                      <Badge
                        variant={getStatusVariant(ticket.status)}
                        className="flex items-center gap-1"
                      >
                        {getStatusIcon(ticket.status)}
                        {ticket.status_string}
                      </Badge>
                      <Badge variant={getPriorityVariant(ticket.priority)}>
                        {ticket.priority_string}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {ticket.details}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>#{ticket.code}</span>
                      <span>•</span>
                      <span>
                        Created:{" "}
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>
                        Updated:{" "}
                        {new Date(ticket.updated_at).toLocaleDateString()}
                      </span>

                      {/* {ticket.attachments.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {ticket.attachments.length} attachment(s)
                          </span>
                        </>
                      )} */}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateTicketDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateTicket}
      />

      <ViewTicketDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        ticket={selectedTicket}
        onTicketUpdate={fetchTickets}
      />
    </div>
  );
}
