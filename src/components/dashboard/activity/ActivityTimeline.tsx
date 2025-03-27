
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

interface ActivityItem {
  time: string;
  action: string;
  details: string;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Atividade Recente</CardTitle>
        <CardDescription>
          Últimas ações realizadas na plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((item, i) => (
            <div key={i} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="flex h-2 w-2 rounded-full bg-blue-light" />
                {i < activities.length - 1 && <div className="h-full w-px bg-border" />}
              </div>
              <div className="space-y-1 pb-4">
                <p className="text-sm text-muted-foreground">{item.time}</p>
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
