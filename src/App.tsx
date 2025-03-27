
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import ParentDashboard from "@/pages/ParentDashboard";
import SchoolDashboard from "@/pages/SchoolDashboard";
import ParentMessages from "@/pages/ParentMessages";
import SchoolMessages from "@/pages/SchoolMessages";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full border-4 border-t-blue-light border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <p className="mt-4 text-lg font-medium">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              
              {/* Web-only School Admin Routes */}
              <Route path="/school" element={<Navigate to="/school/dashboard" replace />} />
              <Route path="/school/dashboard" element={<SchoolDashboard />} />
              <Route path="/school/messages" element={<SchoolMessages />} />
              
              {/* Mobile Parent Routes */}
              <Route path="/parent" element={<Navigate to="/parent/dashboard" replace />} />
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              <Route path="/parent/messages" element={<ParentMessages />} />
              
              {/* Redirects */}
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/school-dashboard" element={<Navigate to="/school/dashboard" replace />} />
              <Route path="/school-messages" element={<Navigate to="/school/messages" replace />} />
              <Route path="/parent-dashboard" element={<Navigate to="/parent/dashboard" replace />} />
              <Route path="/parent-messages" element={<Navigate to="/parent/messages" replace />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
