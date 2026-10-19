"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Sheet (Radix Dialog), restyled with the Smooth Tickets tokens. Top side only, which is all the menu needs.
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

function SheetContent({ className, children, ...props }: ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-night/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-surface text-fg outline-none data-[state=closed]:animate-sheet-up data-[state=open]:animate-sheet-down",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger };
