
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MotionItem } from "@/components/layout/MotionContainer";
import { NewMessageForm } from "@/components/messages/NewMessageForm";
import { Input } from "@/components/ui/input";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface SentMessage {
  id: string;
  title: string;
  content: string;
  date: Date;
  type: "general" | "individual";
  category?: string;
  readCount: number;
  totalRecipients: number;
  hasAttachment?: boolean;
}

export default function SchoolMessages() {
  const [activeTab, setActiveTab] = useState<"history" | "new">("history");
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate fetching messages
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample data
        const data: SentMessage[] = [
          {
            id: "1",
            title: "Reunião de Pais - 2º Trimestre",
            content: "Prezados Pais e Responsáveis,\n\nConvidamos para a reunião de encerramento do 2º trimestre que ocorrerá no dia 15 de agosto, quinta-feira, às 19h, no auditório da escola.\n\nA presença de todos é muito importante para o acompanhamento do desenvolvimento educacional de seu(sua) filho(a).\n\nAtenciosamente,\nEquipe Pedagógica",
            date: new Date(2023, 7, 10),
            type: "general",
            category: "Reunião de Pais",
            readCount: 145,
            totalRecipients: 420
          },
          {
            id: "2",
            title: "Boletim do 2º Trimestre disponível",
            content: "Informamos que o boletim do 2º trimestre já está disponível para consulta no portal do aluno. Para qualquer dúvida sobre as notas, entre em contato com a secretaria.",
            date: new Date(2023, 7, 8),
            type: "individual",
            readCount: 1,
            totalRecipients: 1,
            hasAttachment: true
          },
          {
            id: "3",
            title: "Calendário de Provas - Agosto",
            content: "Segue anexo o calendário de provas para o mês de agosto. Lembramos que é importante que os alunos se preparem com antecedência para as avaliações.",
            date: new Date(2023, 7, 5),
            type: "general",
            hasAttachment: true,
            category: "Avaliações",
            readCount: 389,
            totalRecipients: 420
          },
          {
            id: "4",
            title: "Feira de Ciências - Informativo",
            content: "A Feira de Ciências acontecerá no dia 22/08, das 14h às 18h. Cada aluno deverá apresentar seu projeto conforme as orientações fornecidas pelo professor responsável.",
            date: new Date(2023, 7, 3),
            type: "general",
            category: "Evento Escolar",
            readCount: 356,
            totalRecipients: 420
          },
          {
            id: "5",
            title: "Sobre o comportamento de João",
            content: "Gostaríamos de conversar sobre algumas questões comportamentais observadas em sala de aula. Por favor, entre em contato para agendarmos uma reunião.",
            date: new Date(2023, 6, 25),
            type: "individual",
            readCount: 1,
            totalRecipients: 1
          }
        ];
        
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Erro ao carregar mensagens",
          description: "Não foi possível carregar o histórico de mensagens. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
  }, [toast]);
  
  const filteredMessages = messages.filter(message => {
    // Filter by search query
    const matchesSearch = 
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected categories
    const matchesCategory = 
      selectedCategories.length === 0 || 
      (message.category && selectedCategories.includes(message.category));
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories from messages
  const categories = [...new Set(messages.filter(m => m.category).map(m => m.category))] as string[];

  return (
    <>
      <AppHeader userType="school" />
      <PageContainer>
        <div className="space-y-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Comunicações</h1>
              <p className="text-muted-foreground">
                Gerencie as mensagens enviadas para pais e responsáveis
              </p>
            </div>
            <Button 
              onClick={() => setActiveTab("new")}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Nova Mensagem</span>
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "history" | "new")} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="new">Nova Mensagem</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar mensagens..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filtrar por categoria</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(
                            checked
                              ? [...selectedCategories, category]
                              : selectedCategories.filter((c) => c !== category)
                          );
                        }}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="general">Gerais</TabsTrigger>
                  <TabsTrigger value="individual">Individuais</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4 space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-full h-32 rounded-lg bg-muted animate-pulse"
                        />
                      ))}
                    </div>
                  ) : filteredMessages.length > 0 ? (
                    filteredMessages.map((message, i) => (
                      <MotionItem key={message.id} delay={i * 100}>
                        <Card className="card-hover">
                          <CardHeader className="p-4 pb-2 cursor-pointer">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-base font-medium">
                                    {message.title}
                                  </CardTitle>
                                  {message.type === "general" && (
                                    <Badge variant="outline" className="bg-yellow-pastel/20 text-foreground">
                                      Geral
                                    </Badge>
                                  )}
                                  {message.type === "individual" && (
                                    <Badge variant="outline" className="bg-orange-soft/20 text-foreground">
                                      Individual
                                    </Badge>
                                  )}
                                  {message.category && (
                                    <Badge variant="outline" className="bg-green-water/20 text-foreground">
                                      {message.category}
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription>
                                  Enviada em {message.date.toLocaleDateString('pt-BR')} • {" "}
                                  {message.readCount} de {message.totalRecipients} leram
                                </CardDescription>
                              </div>
                              
                              <Badge 
                                variant={message.readCount === message.totalRecipients ? "default" : "outline"}
                                className={
                                  message.readCount === message.totalRecipients 
                                    ? "bg-green-water text-white" 
                                    : ""
                                }
                              >
                                {Math.round((message.readCount / message.totalRecipients) * 100)}%
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {message.content}
                            </p>
                          </CardContent>
                        </Card>
                      </MotionItem>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Nenhuma mensagem encontrada</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="general" className="mt-4 space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-full h-32 rounded-lg bg-muted animate-pulse"
                        />
                      ))}
                    </div>
                  ) : filteredMessages.filter(m => m.type === "general").length > 0 ? (
                    filteredMessages
                      .filter(m => m.type === "general")
                      .map((message, i) => (
                        <MotionItem key={message.id} delay={i * 100}>
                          <Card className="card-hover">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <CardTitle className="text-base font-medium">
                                      {message.title}
                                    </CardTitle>
                                    {message.category && (
                                      <Badge variant="outline" className="bg-green-water/20 text-foreground">
                                        {message.category}
                                      </Badge>
                                    )}
                                  </div>
                                  <CardDescription>
                                    Enviada em {message.date.toLocaleDateString('pt-BR')} • {" "}
                                    {message.readCount} de {message.totalRecipients} leram
                                  </CardDescription>
                                </div>
                                
                                <Badge 
                                  variant={message.readCount === message.totalRecipients ? "default" : "outline"}
                                  className={
                                    message.readCount === message.totalRecipients 
                                      ? "bg-green-water text-white" 
                                      : ""
                                  }
                                >
                                  {Math.round((message.readCount / message.totalRecipients) * 100)}%
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {message.content}
                              </p>
                            </CardContent>
                          </Card>
                        </MotionItem>
                      ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Nenhuma mensagem geral encontrada</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="individual" className="mt-4 space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-full h-32 rounded-lg bg-muted animate-pulse"
                        />
                      ))}
                    </div>
                  ) : filteredMessages.filter(m => m.type === "individual").length > 0 ? (
                    filteredMessages
                      .filter(m => m.type === "individual")
                      .map((message, i) => (
                        <MotionItem key={message.id} delay={i * 100}>
                          <Card className="card-hover">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <CardTitle className="text-base font-medium">
                                      {message.title}
                                    </CardTitle>
                                    <Badge variant="outline" className="bg-orange-soft/20 text-foreground">
                                      Individual
                                    </Badge>
                                  </div>
                                  <CardDescription>
                                    Enviada em {message.date.toLocaleDateString('pt-BR')} • {" "}
                                    {message.readCount} de {message.totalRecipients} leram
                                  </CardDescription>
                                </div>
                                
                                <Badge 
                                  variant={message.readCount === message.totalRecipients ? "default" : "outline"}
                                  className={
                                    message.readCount === message.totalRecipients 
                                      ? "bg-green-water text-white" 
                                      : ""
                                  }
                                >
                                  {Math.round((message.readCount / message.totalRecipients) * 100)}%
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {message.content}
                              </p>
                            </CardContent>
                          </Card>
                        </MotionItem>
                      ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Nenhuma mensagem individual encontrada</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <NewMessageForm />
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </>
  );
}
