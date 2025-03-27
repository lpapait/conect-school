
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MotionContainer } from "@/components/layout/MotionContainer";

export default function Login() {
  const user = localStorage.getItem("user");
  
  // Redirect to appropriate dashboard if user is already logged in
  if (user) {
    const userObj = JSON.parse(user);
    return <Navigate to={userObj.type === "parent" ? "/parent-dashboard" : "/school-dashboard"} replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full px-4 py-3 flex justify-end">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <MotionContainer className="max-w-md w-full">
          <LoginForm />
        </MotionContainer>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="mb-4">Escola Conectada - Plataforma de Comunicação</p>
          <p>&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </main>
    </div>
  );
}
