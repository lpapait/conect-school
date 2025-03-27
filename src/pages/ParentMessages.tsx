
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCard, Message } from "@/components/messages/MessageCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { MotionItem } from "@/components/layout/MotionContainer";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function ParentMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
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
        const data: Message[] = [
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
          },
          {
            id: "3",
            title: "Calendário de Provas - Agosto",
            content: "Segue anexo o calendário de provas para o mês de agosto. Lembramos que é importante que os alunos se preparem com antecedência para as avaliações.",
            sender: "Coordenação Pedagógica",
            date: new Date(2023, 7, 5),
            read: true,
            type: "general",
            hasAttachment: true,
            category: "Avaliações"
          },
          {
            id: "4",
            title: "Feira de Ciências - Informativo",
            content: "A Feira de Ciências acontecerá no dia 22/08, das 14h às 18h. Cada aluno deverá apresentar seu projeto conforme as orientações fornecidas pelo professor responsável.",
            sender: "Coordenação de Eventos",
            date: new Date(2023, 7, 3),
            read: false,
            type: "general",
            category: "Evento Escolar"
          },
          {
            id: "5",
            title: "Sobre o comportamento de João",
            content: "Gostaríamos de conversar sobre algumas questões comportamentais observadas em sala de aula. Por favor, entre em contato para agendarmos uma reunião.",
            sender: "Professora Ana Paula - Português",
            date: new Date(2023, 6, 25),
            read: true,
            type: "individual"
          }
        ];
        
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Erro ao carregar mensagens",
          description: "Não foi possível carregar suas mensagens. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
  }, [toast]);
  
  const handleReadStatusChange = (id: string, status: boolean) => {
    setMessages(currentMessages => 
      currentMessages.map(message => 
        message.id === id ? { ...message, read: status } : message
      )
    );
  };
  
  const filteredMessages = messages.filter(message => {
    // Filter by search query
    const matchesSearch = 
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      <AppHeader userType="parent" />
      <PageContainer>
        <div className="space-y-6 py-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
            <p className="text-muted-foreground">
              Visualize comunicados e mensagens da escola
            </p>
          </div>
          
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
                      className="w-full h-24 rounded-lg bg-muted animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map((message, i) => (
                  <MotionItem key={message.id} delay={i * 100}>
                    <MessageCard 
                      message={message} 
                      onReadStatusChange={handleReadStatusChange}
                    />
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
                      className="w-full h-24 rounded-lg bg-muted animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredMessages.filter(m => m.type === "general").length > 0 ? (
                filteredMessages
                  .filter(m => m.type === "general")
                  .map((message, i) => (
                    <MotionItem key={message.id} delay={i * 100}>
                      <MessageCard 
                        message={message} 
                        onReadStatusChange={handleReadStatusChange}
                      />
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
                      className="w-full h-24 rounded-lg bg-muted animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredMessages.filter(m => m.type === "individual").length > 0 ? (
                filteredMessages
                  .filter(m => m.type === "individual")
                  .map((message, i) => (
                    <MotionItem key={message.id} delay={i * 100}>
                      <MessageCard 
                        message={message} 
                        onReadStatusChange={handleReadStatusChange}
                      />
                    </MotionItem>
                  ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhuma mensagem individual encontrada</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </>
  );
}
