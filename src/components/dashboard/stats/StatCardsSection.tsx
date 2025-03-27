
import React from "react";
import { MessagesSquare, Users } from "lucide-react";
import { MotionItem } from "@/components/layout/MotionContainer";
import { StatCard } from "./StatCard";

interface StatCardsSectionProps {
  messageStats: {
    total: number;
    read: number;
    general: number;
    individual: number;
  };
  userCount: {
    totalParents: number;
    activeParents: number;
    totalStudents: number;
  };
}

export function StatCardsSection({ messageStats, userCount }: StatCardsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MotionItem delay={100}>
        <StatCard
          title="Mensagens Enviadas"
          value={messageStats.total}
          description={`${Math.round((messageStats.read / messageStats.total) * 100)}% lidas pelos destinatários`}
          icon={<MessagesSquare className="h-5 w-5 text-muted-foreground" />}
          link="/school/messages"
          linkText="Ver detalhes"
        />
      </MotionItem>
      
      <MotionItem delay={200}>
        <StatCard
          title="Pais Registrados"
          value={userCount.totalParents}
          description={`${userCount.activeParents} ativos nos últimos 30 dias`}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          link="/school/users"
          linkText="Gerenciar usuários"
        />
      </MotionItem>
      
      <MotionItem delay={300}>
        <StatCard
          title="Alunos Registrados"
          value={userCount.totalStudents}
          description={`Em ${Math.round(userCount.totalStudents / 25)} turmas`}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          link="/school/students"
          linkText="Ver alunos"
        />
      </MotionItem>
    </div>
  );
}
