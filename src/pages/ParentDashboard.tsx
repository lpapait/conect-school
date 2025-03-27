
import { useEffect, useState } from "react";
import { Bell, Calendar, ChevronRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MotionContainer, MotionItem } from "@/components/layout/MotionContainer";
import { MessageCard, Message } from "@/components/messages/MessageCard";
import { Badge } from "@/components/ui/badge";

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // Simulate fetching messages
    setTimeout(() => {
      setMessages([
        {
          id: "1",
          title: "Reunião de Pais - 2º Trimestre",
          content: "Prezados Pais e Responsáveis,\n\nConvidamos para a reunião de encerramento do 2º trimestre que ocorrerá no dia 15 de agosto, quinta-feira, às 19h, no auditório da escola.\n\nA presença de todos é muito importante para o acompanhamento do desenvolvimento educacional de seu(sua) filho(a).\n\nAtenciosamente,\nEquipe Pedagógica",
          sender: "Coordenação Pedagógica",
          date: new Date(2023, 7, 10),
          read: false,
          type: "general",
          category: "Reunião de Pais"
        },
        {
          id: "2",
          title: "Boletim do 2º Trimestre disponível",
          content: "Informamos que o boletim do 2º trimestre já está disponível para consulta no portal do aluno. Para qualquer dúvida sobre as notas, entre em contato com a secretaria.",
          sender: "Secretaria Escolar",
          date: new Date(2023, 7, 8),
          read: true,
          type: "individual",
          hasAttachment: true
        }
      ]);
    }, 1000);
  }, []);
  
  const handleReadStatusChange = (id: string, status: boolean) => {
    setMessages(currentMessages => 
      currentMessages.map(message => 
        message.id === id ? { ...message, read: status } : message
      )
    );
  };

  const upcomingEvents = [
    {
      id: "1",
      title: "Reunião de Pais",
      date: "15/08/2023",
      time: "19:00"
    },
    {
      id: "2",
      title: "Feira de Ciências",
      date: "22/08/2023",
      time: "14:00 - 18:00"
    }
  ];

  return (
    <>
      <AppHeader userType="parent" />
      <PageContainer>
        <div className="space-y-8 py-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Olá, João</h1>
            <p className="text-muted-foreground">
              Acompanhe aqui as atividades e comunicados de seu filho
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MotionItem delay={100}>
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Mensagens
                  </CardTitle>
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-3xl font-bold">{messages.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {messages.filter(m => !m.read).length} não lidas
                  </p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button variant="ghost" className="w-full justify-between text-xs" onClick={() => navigate("/parent/messages")}>
                    <span>Ver todas</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </MotionItem>
            
            <MotionItem delay={200}>
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Eventos
                  </CardTitle>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-3xl font-bold">{upcomingEvents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Próximos eventos
                  </p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button variant="ghost" className="w-full justify-between text-xs" onClick={() => navigate("/parent/calendar")}>
                    <span>Ver calendário</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </MotionItem>
            
            <MotionItem delay={300}>
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Frequência
                  </CardTitle>
                  <Badge className="h-5 bg-green-water text-white">85%</Badge>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <Progress value={85} className="h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Presença no último mês
                  </p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button variant="ghost" className="w-full justify-between text-xs">
                    <span>Ver detalhes</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </MotionItem>
            
            <MotionItem delay={400}>
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Notificações
                  </CardTitle>
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Novas notificações
                  </p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button variant="ghost" className="w-full justify-between text-xs" onClick={() => navigate("/parent/notifications")}>
                    <span>Ver todas</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </MotionItem>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <MotionItem delay={500} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Mensagens Recentes</h2>
                <Button variant="link" onClick={() => navigate("/parent/messages")}>
                  Ver todas
                </Button>
              </div>
              
              <div className="space-y-3">
                {messages.length > 0 ? (
                  messages.map(message => (
                    <MessageCard 
                      key={message.id} 
                      message={message} 
                      onReadStatusChange={handleReadStatusChange}
                    />
                  ))
                ) : (
                  <Card className="flex items-center justify-center p-8 text-center text-muted-foreground">
                    <p>Carregando mensagens...</p>
                  </Card>
                )}
              </div>
            </MotionItem>
            
            <MotionItem delay={600} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Próximos Eventos</h2>
                <Button variant="link" onClick={() => navigate("/parent/calendar")}>
                  Ver calendário
                </Button>
              </div>
              
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <Card key={event.id} className="card-hover">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium">
                          {event.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {event.date}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        {event.time}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </MotionItem>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
