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
import { Loader } from "lucide-react";
import React, { useCallback } from "react";
import { toast } from "sonner";

const SignoutDialog = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen, setIsOpen } = props;

  //   const { mutate, isPending } = useMutation({
  //     mutationFn: signoutFn,
  //     onSuccess: () => {
  //       setIsOpen(false);
  //       toast.success("Signout Success", {
  //         description: "You have been signed out successfully.",
  //       });
  //       window.location.href = "/";
  //     },
  //     onError: (error) => {
  //       toast.error("Signout Error", {
  //         description: error.message,
  //       });
  //     },
  //   });

  //   const handleSignout = useCallback(() => {
  //     mutate();
  //   }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card w-3/4 sm:max-w-lg border-none">
          <DialogHeader>
            <DialogTitle>Are you sure you want to sign out?</DialogTitle>
            <DialogDescription className="pt-3">
              This will end your current session and you will need to log in
              again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <Button
              disabled={isPending}
              type="button"
              className="!text-card-foreground bg-secondary hover:!bg-accent"
              onClick={handleSignout}
            >
              {isPending && <Loader className="animate-spin" />}
              Yes
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignoutDialog;
