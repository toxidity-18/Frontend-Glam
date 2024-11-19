import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        Success:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        0:
          "border-transparent bg-[#FFA500]  text-secondary ",
        2:
          "border-transparent bg-[#28a745]  text-secondary ",
        1:
          "border-transparent bg-destructive text-secondary ",
        3:
        "border-transparent bg-destructive text-secondary ",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,

  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }, ), className)} {...props} />);
}

export { Badge, badgeVariants }
