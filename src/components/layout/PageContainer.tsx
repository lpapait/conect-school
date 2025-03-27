
import React from "react";
import { cn } from "@/lib/utils";
import { MotionContainer } from "./MotionContainer";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("min-h-screen pb-10", className)}>
      <MotionContainer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </MotionContainer>
    </main>
  );
}
