"use client";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Accordion, restyled for Smooth Tickets: each item is a soft card.
function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("space-y-3", className)} {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-2xl bg-paper transition-colors duration-200 data-[state=open]:bg-surface-2", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left text-[15px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-6 sm:text-base",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-fg transition-[transform,background-color,color] duration-200 group-hover:bg-brand group-hover:text-white group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand group-data-[state=open]:text-white"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2.2} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    // forceMount keeps every answer in the server HTML (crawlable). Radix then treats them as open, so the
    // collapse is CSS: grid rows 0fr <-> 1fr animates both ways, and `invisible` keeps closed answers out of
    // the tab order and screen readers (visibility flips after the close transition ends).
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none data-[state=closed]:invisible data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn("px-5 pb-6 sm:px-6", className)}>{children}</div>
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
