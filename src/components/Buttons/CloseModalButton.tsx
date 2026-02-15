"use client";

import { forwardRef } from "react";
import { Button } from "@heroui/react";

type CloseModalButtonProps = {
  onClose: () => void;
};

export const CloseModalButton = forwardRef<
  HTMLButtonElement,
  CloseModalButtonProps
>(function CloseModalButton({ onClose }, ref) {
  return (
    <Button variant="flat" onPress={onClose} ref={ref}>
      Close
    </Button>
  );
});
