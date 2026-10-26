"use client";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Accordion. Styles live in globals.css (accordion, accordion-*).
function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("accordion", className)} {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={className} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn("accordion-trigger", className)} {...props}>
        {children}
        <span aria-hidden className="accordion-icon">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2.2} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    // forceMount keeps every answer in the server HTML (crawlable). Radix then treats them as open, so the
    // collapse is CSS, and `invisible` keeps closed answers out of the tab order and screen readers.
    <AccordionPrimitive.Content data-slot="accordion-content" forceMount className="accordion-content" {...props}>
      <div className="min-h-0 overflow-hidden">
        <div className={cn("accordion-body", className)}>{children}</div>
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
