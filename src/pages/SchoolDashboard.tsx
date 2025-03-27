
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { MotionItem } from "@/components/layout/MotionContainer";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCardsSection } from "@/components/dashboard/stats/StatCardsSection";
import { DashboardTabs } from "@/components/dashboard/tabs/DashboardTabs";
import { ActivityTimeline } from "@/components/dashboard/activity/ActivityTimeline";

export default function SchoolDashboard() {
  const [messageStats, setMessageStats] = useState({
    total: 0,
    read: 0,
    general: 0,
    individual: 0,
  });
  
  const [userCount, setUserCount] = useState({
    totalParents: 0,
    activeParents: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    // Simulate fetching stats
    setTimeout(() => {
      setMessageStats({
        total: 128,
        read: 98,
        general: 45,
        individual: 83,
      });
      
      setUserCount({
        totalParents: 420,
        activeParents: 385,
        totalStudents: 512,
      });
    }, 1000);
  }, []);

  // Sample data for charts
  const messageActivityData = [
    { name: "Jan", count: 15 },
    { name: "Fev", count: 20 },
    { name: "Mar", count: 18 },
    { name: "Abr", count: 25 },
    { name: "Mai", count: 22 },
    { name: "Jun", count: 30 },
    { name: "Jul", count: 28 },
  ];
  
  const messageCategoryData = [
    { name: "Comunicados", count: 45 },
    { name: "Reuniões", count: 23 },
    { name: "Eventos", count: 18 },
    { name: "Avaliações", count: 12 },
    { name: "Outros", count: 30 },
  ];

  const recentActivities = [
    { time: "Hoje, 10:23", action: "Mensagem geral enviada", details: "Comunicado sobre Feira de Ciências enviado para todos os pais" },
    { time: "Ontem, 15:45", action: "Resposta recebida", details: "Ana Silva respondeu ao comunicado sobre a reunião de pais" },
    { time: "Ontem, 11:02", action: "Usuário adicionado", details: "Novo responsável cadastrado: Marcelo Alves (pai de Gustavo Alves - 8º ano B)" },
    { time: "22/07/2023", action: "Evento agendado", details: "Reunião de Pais agendada para 15/08/2023" },
  ];

  return (
    <>
      <AppHeader userType="school" />
      <PageContainer>
        <div className="space-y-8 py-6">
          <DashboardHeader 
            title="Painel Administrativo" 
            subtitle="Gerencie suas comunicações e visualize métricas" 
          />
          
          <StatCardsSection 
            messageStats={messageStats} 
            userCount={userCount} 
          />
          
          <MotionItem delay={400}>
            <DashboardTabs 
              messageActivityData={messageActivityData}
              messageCategoryData={messageCategoryData}
            />
          </MotionItem>
          
          <MotionItem delay={500}>
            <ActivityTimeline activities={recentActivities} />
          </MotionItem>
        </div>
      </PageContainer>
    </>
  );
}
