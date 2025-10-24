import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, onMouseMove, onMouseLeave, ...props }, ref) => {
    const overlayRef = React.useRef<HTMLDivElement | null>(null);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
      // Preserve any user-provided handler
      onMouseMove?.(event);
      const { currentTarget, clientX, clientY } = event;
      const rect = currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--x", `${x}px`);
        overlayRef.current.style.setProperty("--y", `${y}px`);
        overlayRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (event) => {
      // Preserve any user-provided handler
      onMouseLeave?.(event);
      if (overlayRef.current) {
        overlayRef.current.style.opacity = "0";
      }
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm group/card",
          className,
        )}
        {...props}
      >
        {/* Spotlight overlay (fallback for @aceternity/card-spotlight) */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300",
            "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(240px 240px at var(--x) var(--y), hsl(var(--primary) / 0.18), transparent 60%)",
            // Use masking so the effect only brightens content, not outside
            WebkitMaskImage:
              "radial-gradient(200px 200px at var(--x) var(--y), rgba(255,255,255,0.9), transparent 60%)",
            maskImage:
              "radial-gradient(200px 200px at var(--x) var(--y), rgba(255,255,255,0.9), transparent 60%)",
          }}
        />
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
