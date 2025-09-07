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
  Eye,
  Trash2,
  ArrowLeft,
  Send,
} from "lucide-react";

import { CreateTicketDialog } from "@/components/shared/create-ticket-dialog";
import {
  addTicket,
  getTickets,
  deleteTicket,
  addReply,
} from "@/services/ticket";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export interface Reply {
  id: number;
  reply: number;
  user_id: number;
  user: {
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}
export interface Ticket {
  id: number;
  code: string;
  user_id: number;
  subject: string;
  details: string;
  status: "open" | "pending" | "resolved" | "closed";
  status_string: string;
  priority: "low" | "medium" | "high" | "urgent";
  ticketreplies: Reply[];
  priority_string: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  // useEffect(() => {
  //   if (selectedTicket) {
  //     fetchReplies(selectedTicket.id);
  //   }
  // }, [selectedTicket]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const res = await getTickets();
      console.log(res);
      setTickets(res.data.data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
    setIsLoading(false);
  };

  // const fetchReplies = async (ticketId: number) => {
  //   try {

  //     console.log(res);
  //     setReplies(res.data.data || []);
  //   } catch (error) {
  //     console.error("Failed to fetch replies:", error);
  //   }
  // };

  const handleDeleteTicket = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId);
      fetchTickets();
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(null);
      }
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  };

  const handleReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    setIsReplying(true);
    try {
      await addReply(selectedTicket.id, replyMessage);
      setReplyMessage("");
      fetchTickets();
      setSelectedTicket(null);
      // fetchReplies(selectedTicket.id);
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
    setIsReplying(false);
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
        return "default";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  if (selectedTicket) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedTicket(null)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Button>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedTicket.subject}</CardTitle>
                <CardDescription>#{selectedTicket.code}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getStatusVariant(selectedTicket.status)}
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(selectedTicket.status)}
                  {selectedTicket.status_string}
                </Badge>
                <Badge variant={getPriorityVariant(selectedTicket.priority)}>
                  {selectedTicket.priority_string}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">
                Created: {formatDate(selectedTicket.created_at)}
              </p>
              <p className="text-muted-foreground">
                Updated: {formatDate(selectedTicket.updated_at)}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-2">Issue Details</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {selectedTicket.details}
              </p>
            </div>

            {selectedTicket.attachments &&
              selectedTicket.attachments.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-2">Attachments</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.attachments.map((attachment, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        {attachment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Conversation</h3>

              <div className="space-y-4 mb-6">
                {selectedTicket.ticketreplies.length > 0 ? (
                  selectedTicket.ticketreplies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`p-4 rounded-lg "bg-blue-50 border border-blue-200"
                         
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{reply.user.name}</span>
                        <span className="font-medium">{reply.user.email}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(reply.created_at)}
                        </span>
                      </div>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {reply.reply}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No replies yet. Start the conversation.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={handleReply}
                  disabled={isReplying || !replyMessage.trim()}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isReplying ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center md:flex-row flex-col justify-between">
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
            <p className="text-muted-foreground  mb-4">
              Create your first support ticket to get help with any issues
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create Ticket
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket #</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.code}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell className=" font-semibold">
                  {ticket.status}
                </TableCell>
                <TableCell>
                  {new Date(ticket.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {/* <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the ticket and all its data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTicket(ticket.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CreateTicketDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        fetchTickets={fetchTickets}
      />
    </div>
  );
}
