import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Button, restyled with the Smooth Tickets tokens.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-soft focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand text-white shadow-[0_8px_30px_-8px_rgba(0,122,255,.8)] hover:bg-[#0068d9]",
        outline: "bg-surface text-fg ring-1 ring-line hover:bg-surface-2",
        // for photos and always-dark sections
        glass: "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/20",
        lime: "bg-lime text-night hover:bg-[#d6ff5c]",
        dark: "bg-night text-white hover:bg-night-3",
        ghost: "text-muted hover:bg-fg/5 hover:text-fg",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-9 px-4 text-[13px]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
