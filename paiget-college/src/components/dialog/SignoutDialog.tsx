"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const SignoutDialog = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen, setIsOpen } = props;
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  //   const handleSignout = useCallback(() => {
  //     mutate();
  //   }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setIsOpen(false);
      toast.success("Signout Success", {
        description: "You have been signed out successfully.",
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Signout Error", {
        description: "An error occurred while signing out.",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card w-3/4 sm:max-w-lg border-none p-3!">
          <DialogHeader>
            <DialogTitle>Are you sure you want to sign out?</DialogTitle>
            <DialogDescription className="pt-3!">
              This will end your current session and you will need to log in
              again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="button"
              className="text-card-foreground! bg-secondary hover:bg-accent! px-2! cursor-pointer"
              onClick={() => handleLogout()}
            >
              {isLoading && <Loader className="animate-spin" />}
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignoutDialog;
