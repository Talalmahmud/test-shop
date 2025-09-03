// components/view-ticket-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, MessageSquare } from "lucide-react";
import { Ticket } from "@/app/user/tickets/page";

interface ViewTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket | null;
  onTicketUpdate: () => void;
}

export function ViewTicketDialog({
  open,
  onOpenChange,
  ticket,
  onTicketUpdate,
}: ViewTicketDialogProps) {
  if (!ticket) return null;

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
        return "destructive";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Support Ticket #{ticket.code}
          </DialogTitle>
          <DialogDescription>
            Created on {new Date(ticket.created_at).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Status */}
          <div className="flex items-center gap-4">
            <Badge variant={getStatusVariant(ticket.status)}>
              Status: {ticket.status_string}
            </Badge>
            <Badge variant={getPriorityVariant(ticket.priority)}>
              Priority: {ticket.priority_string}
            </Badge>
          </div>

          {/* Subject */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Subject</h3>
            <p className="text-muted-foreground">{ticket.subject}</p>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Details</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {ticket.details}
            </p>
          </div>

          {/* Attachments */}
          {/* {ticket.attachments.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Attachments</h3>
              <div className="space-y-2">
                {ticket.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm flex-1">{attachment}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Ticket Replies */}
          {/* {ticket.replies && ticket.replies.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Replies</h3>
              <div className="space-y-4">
                {ticket.replies.map((reply) => (
                  <div key={reply.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium capitalize">
                        {reply.user_type}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {new Date(reply.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{reply.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
