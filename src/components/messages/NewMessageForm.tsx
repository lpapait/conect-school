
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Paperclip, Send, Users, User } from "lucide-react";
import { MotionItem } from "../layout/MotionContainer";

export function NewMessageForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");
  const [messageType, setMessageType] = useState<"general" | "individual">("general");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!subject || !message || (messageType === "individual" && !recipient)) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Mensagem enviada",
        description: messageType === "general" 
          ? "Sua mensagem foi enviada para todos os pais/responsáveis."
          : `Sua mensagem foi enviada para ${recipient}.`,
      });

      // Reset form
      setSubject("");
      setMessage("");
      setRecipient("");
      setCategory("");

    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const recipientOptions = [
    "Ana Silva (Mãe de João Silva - 5º ano A)",
    "Carlos Oliveira (Pai de Maria Oliveira - 3º ano B)",
    "Patrícia Santos (Mãe de Pedro Santos - 7º ano C)",
    "Ricardo Souza (Pai de Beatriz Souza - 9º ano A)",
    "Fernanda Lima (Mãe de Gabriel Lima - 2º ano B)",
  ];

  const categoryOptions = [
    "Comunicado Geral",
    "Evento Escolar",
    "Reunião de Pais",
    "Calendário Escolar",
    "Avaliações",
    "Disciplina",
    "Atividades Extracurriculares",
  ];

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="text-xl">Nova Mensagem</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs 
            defaultValue="general" 
            onValueChange={(v) => setMessageType(v as "general" | "individual")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Users size={16} />
                <span>Mensagem Geral</span>
              </TabsTrigger>
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <User size={16} />
                <span>Mensagem Individual</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <MotionItem delay={100}>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
              </MotionItem>
              
              <MotionItem delay={200}>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </MotionItem>
              
              <MotionItem delay={300}>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Escreva sua mensagem aqui..."
                    className="min-h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </MotionItem>
            </TabsContent>
            
            <TabsContent value="individual" className="space-y-4">
              <MotionItem delay={100}>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Destinatário</Label>
                  <Select value={recipient} onValueChange={setRecipient}>
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="Selecione um destinatário" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipientOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </MotionItem>
              
              <MotionItem delay={200}>
                <div className="space-y-2">
                  <Label htmlFor="subject-individual">Assunto</Label>
                  <Input
                    id="subject-individual"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
              </MotionItem>
              
              <MotionItem delay={300}>
                <div className="space-y-2">
                  <Label htmlFor="message-individual">Mensagem</Label>
                  <Textarea
                    id="message-individual"
                    placeholder="Escreva sua mensagem aqui..."
                    className="min-h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </MotionItem>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          type="button"
          className="gap-2"
        >
          <Paperclip size={16} />
          <span>Anexar</span>
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? "Enviando..." : (
            <>
              <span>Enviar</span>
              <Send size={16} />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
