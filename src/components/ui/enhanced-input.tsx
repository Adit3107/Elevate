import * as React from "react";
import { cn } from "@/lib/utils";

export interface EnhancedInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isInvalid?: boolean;
    errorMessage?: string;
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
    (
        {
            className,
            type,
            startContent,
            endContent,
            isInvalid,
            errorMessage,
            ...props
        },
        ref
    ) => {
        return (
            <div className="w-full">
                <div
                    className={cn(
                        "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all",
                        isInvalid && "border-destructive focus-within:ring-destructive",
                        className
                    )}
                >
                    {startContent && (
                        <div className="flex items-center mr-2">{startContent}</div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex-1 w-full bg-transparent py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        ref={ref}
                        {...props}
                    />
                    {endContent && (
                        <div className="flex items-center ml-2">{endContent}</div>
                    )}
                </div>
                {isInvalid && errorMessage && (
                    <p className="text-xs text-destructive mt-1.5">{errorMessage}</p>
                )}
            </div>
        );
    }
);
EnhancedInput.displayName = "EnhancedInput";

export { EnhancedInput };
