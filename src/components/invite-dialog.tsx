"use client";

import { useState } from "react";
import { Copy, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteDialogProps {
  code: string;
}

export function InviteDialog({ code }: InviteDialogProps) {
  const [open, setOpen] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Invite code copied");
    } catch {
      toast.error("Could not copy. Select the code and copy it manually.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <UserPlus /> Invite members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to your circle</DialogTitle>
          <DialogDescription>Share this code with people you trust. They enter it after creating an account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="invite-code">Invite code</Label>
          <div className="flex gap-2">
            <Input id="invite-code" value={code} readOnly className="font-mono" />
            <Button variant="outline" onClick={copy}>
              <Copy /> Copy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
