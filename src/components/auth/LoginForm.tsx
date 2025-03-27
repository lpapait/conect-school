
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Lock, Mail, School, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MotionItem } from "../layout/MotionContainer";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"parent" | "school">("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, simple validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error("Credenciais inválidas");
      }
      
      // Simulating successful login
      localStorage.setItem("user", JSON.stringify({ email, type: userType }));
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo novamente ${userType === "parent" ? "Responsável" : "Escola"}!`,
        variant: "default",
      });
      
      // Redirect based on user type
      navigate(userType === "parent" ? "/parent-dashboard" : "/school-dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">Escola Conectada</CardTitle>
        <CardDescription className="text-center">
          Faça login para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="parent" onValueChange={(v) => setUserType(v as "parent" | "school")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="parent" className="flex items-center gap-2">
              <User size={16} />
              <span>Pais/Responsáveis</span>
            </TabsTrigger>
            <TabsTrigger value="school" className="flex items-center gap-2">
              <School size={16} />
              <span>Escola</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="parent">
            <form onSubmit={handleLogin} className="space-y-4">
              <MotionItem delay={100}>
                <div className="space-y-2">
                  <Label htmlFor="parent-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="parent-email"
                      placeholder="seu@email.com"
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </MotionItem>
              
              <MotionItem delay={200}>
                <div className="space-y-2">
                  <Label htmlFor="parent-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="parent-password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </MotionItem>
              
              <MotionItem delay={300}>
                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </MotionItem>
            </form>
          </TabsContent>
          
          <TabsContent value="school">
            <form onSubmit={handleLogin} className="space-y-4">
              <MotionItem delay={100}>
                <div className="space-y-2">
                  <Label htmlFor="school-email">Email Institucional</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="school-email"
                      placeholder="escola@dominio.com"
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </MotionItem>
              
              <MotionItem delay={200}>
                <div className="space-y-2">
                  <Label htmlFor="school-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="school-password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </MotionItem>
              
              <MotionItem delay={300}>
                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </MotionItem>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" className="text-sm" onClick={() => navigate("/register")}>
          Ainda não possui conta? Cadastre-se
        </Button>
      </CardFooter>
    </Card>
  );
}
