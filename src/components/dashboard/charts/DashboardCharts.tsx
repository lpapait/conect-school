
import React from "react";
import { AreaChart, BarChart } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";

interface DashboardChartsProps {
  messageActivityData: Array<{ name: string; count: number }>;
  messageCategoryData: Array<{ name: string; count: number }>;
}

export function DashboardCharts({ 
  messageActivityData, 
  messageCategoryData 
}: DashboardChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Atividade Mensal</CardTitle>
            <AreaChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardDescription>Mensagens enviadas por mês</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Chart 
            type="bar"
            data={messageActivityData}
            index="name"
            categories={["count"]}
            colors={["#4D96FF"]}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Mensagens por Categoria</CardTitle>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardDescription>Distribuição das mensagens</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Chart 
            type="pie"
            data={messageCategoryData}
            index="name"
            categories={["count"]}
            colors={["#4D96FF", "#FFE162", "#53D8A3", "#FFA45B", "#B3B3B3"]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
