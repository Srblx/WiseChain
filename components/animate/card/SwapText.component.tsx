import { useState } from "react";

import { cn } from "@/lib/utils";

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The initial text to display.
   */
  initialText: string;

  /**
   * The final text to display.
   */
  finalText: string;

  /**
   * Whether the component should toggle on hover as well as click.
   */
  supportsHover?: boolean;

  /**
   * The class name for the text.
   */
  textClassName?: string;

  /**
   * The class name for the initial text.
   */
  initialTextClassName?: string;

  /**
   * The class name for the final text.
   */
  finalTextClassName?: string;

  /**
   * Whether to disable the click interaction.
   */
  disableClick?: boolean;
  containerHeight?: string; // Add this new prop
}

export default function SwapText({
  initialText,
  finalText,
  className,
  supportsHover = true,
  textClassName,
  initialTextClassName,
  finalTextClassName,
  disableClick,
  containerHeight = "auto", // Default to 'auto' if not provided
  // The rest of the props are passed to the container div.
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState(false);
  const common = "block transition-all duration-1000 ease-slow";

  const longWord = finalText.length > initialText.length ? finalText : null;

  return (
    <div 
      {...props} 
      className={cn("relative overflow-hidden text-foreground", className)}
      style={{ height: containerHeight }} // Add this line
    >
      <div
        className={cn("group cursor-pointer select-none font-bold h-full flex flex-col justify-center p-3", textClassName)}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        <span
          className={cn(common, initialTextClassName, {
            "flex flex-col": true,
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {initialText}
          {Boolean(longWord?.length) && <span className="invisible h-0">{longWord}</span>}
        </span>
        <span
          className={cn(`${common} absolute top-full`, finalTextClassName, {
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {finalText}
        </span>
      </div>
    </div>
  );
}