"use client";

import { useModal } from "@/components/ModalProvider";
import { openGoogleForm } from "@/lib/open-google-form";

export function useApplyAction() {
  const { open } = useModal();

  return () => {
    if (!openGoogleForm()) {
      open("apply");
    }
  };
}
