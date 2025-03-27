
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, ChevronDown, ChevronUp, FileText, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export interface Message {
  id: string;
  title: string;
  content: string;
  sender: string;
  date: Date;
  read: boolean;
  type: "general" | "individual";
  hasAttachment?: boolean;
  category?: string;
}

interface MessageCardProps {
  message: Message;
  onReadStatusChange?: (id: string, status: boolean) => void;
}

export function MessageCard({ message, onReadStatusChange }: MessageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const handleMessageRead = () => {
    if (!message.read && onReadStatusChange) {
      onReadStatusChange(message.id, true);
    }
    setIsExpanded(!isExpanded);
  };

  const handleReply = () => {
    if (replyText.trim() === "") {
      toast({
        title: "Mensagem vazia",
        description: "Por favor, escreva uma mensagem antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi enviada com sucesso.",
    });
    
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <Card className={cn(
      "w-full transition-all duration-200 overflow-hidden",
      !message.read && "border-l-4 border-l-blue-light"
    )}>
      <CardHeader className="p-4 pb-2 cursor-pointer" onClick={handleMessageRead}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "font-medium",
                !message.read && "font-semibold"
              )}>
                {message.title}
              </h3>
              {message.type === "general" && (
                <Badge variant="outline" className="bg-yellow-pastel/20 text-foreground">
                  Geral
                </Badge>
              )}
              {message.category && (
                <Badge variant="outline" className="bg-green-water/20 text-foreground">
                  {message.category}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              De: {message.sender} • {formatDistanceToNow(message.date, { addSuffix: true, locale: ptBR })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {message.hasAttachment && (
              <FileText className="h-4 w-4 text-muted-foreground" />
            )}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <>
          <CardContent className="p-4 pt-2">
            <p className="text-sm whitespace-pre-line">{message.content}</p>
            
            {message.hasAttachment && (
              <div className="mt-4">
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  Visualizar anexo
                </Button>
              </div>
            )}
            
            {isReplying && (
              <div className="mt-4 space-y-2">
                <Textarea 
                  placeholder="Escreva sua resposta..." 
                  className="min-h-24 text-sm"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsReplying(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleReply}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-2 px-4 flex justify-between items-center border-t bg-muted/20">
            <div className="flex items-center text-xs text-muted-foreground">
              {message.read ? (
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-green-water" />
                  Lida
                </div>
              ) : (
                "Não lida"
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Responder
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
