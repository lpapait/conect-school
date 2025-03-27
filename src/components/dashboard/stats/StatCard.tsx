
import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  link, 
  linkText,
  delay = 0
}: StatCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <CardTitle className="text-lg font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-2">
        <Button 
          variant="ghost" 
          className="w-full justify-between text-xs" 
          onClick={() => navigate(link)}
        >
          <span>{linkText}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
