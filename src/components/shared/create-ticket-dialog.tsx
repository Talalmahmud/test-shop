// components/create-ticket-dialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    subject: string;
    details: string;
    attachments: string[] | [];
  }) => void;
}

export function CreateTicketDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateTicketDialogProps) {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !details.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload attachments if any
      const attachmentUrls: string[] = [];

      for (const file of attachments) {
        // Simulate file upload - replace with actual upload logic
        const url = await new Promise<string>((resolve) =>
          setTimeout(() => resolve(URL.createObjectURL(file)), 500)
        );
        attachmentUrls.push(url);
      }

      onSubmit({
        subject: subject.trim(),
        details: details.trim(),
        attachments: attachmentUrls.length > 0 ? attachmentUrls : [],
      });

      // Reset form
      setSubject("");
      setDetails("");
      setAttachments([]);
    } catch (error) {
      console.error("Failed to create ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new support ticket. Our team
            will get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details *</Label>
            <Textarea
              id="details"
              placeholder="Please describe your issue in detail..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="cursor-pointer"
              />

              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !subject.trim() || !details.trim()}
            >
              {isSubmitting ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
