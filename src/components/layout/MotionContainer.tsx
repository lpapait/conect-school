
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const MotionContainer: React.FC<MotionContainerProps> = ({ 
  children, 
  className,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        "animate-fade-in opacity-0",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "forwards" 
      }}
    >
      {children}
    </div>
  );
};

export const MotionItem: React.FC<MotionContainerProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  return (
    <div 
      className={cn(
        "animate-slide-up opacity-0",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards" 
      }}
    >
      {children}
    </div>
  );
};
