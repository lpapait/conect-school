
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewMessageForm } from "@/components/messages/NewMessageForm";
import { DashboardCharts } from "../charts/DashboardCharts";

interface DashboardTabsProps {
  messageActivityData: Array<{ name: string; count: number }>;
  messageCategoryData: Array<{ name: string; count: number }>;
}

export function DashboardTabs({ 
  messageActivityData, 
  messageCategoryData 
}: DashboardTabsProps) {
  return (
    <Tabs defaultValue="new-message" className="w-full">
      <TabsList className="grid w-full max-w-sm grid-cols-2 mb-6">
        <TabsTrigger value="new-message">Nova Mensagem</TabsTrigger>
        <TabsTrigger value="analytics">Estatísticas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="new-message">
        <NewMessageForm />
      </TabsContent>
      
      <TabsContent value="analytics">
        <DashboardCharts 
          messageActivityData={messageActivityData}
          messageCategoryData={messageCategoryData}
        />
      </TabsContent>
    </Tabs>
  );
}
