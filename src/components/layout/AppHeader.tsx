
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  userType: "parent" | "school";
}

export function AppHeader({ userType }: AppHeaderProps) {
  const location = useLocation();
  
  const isParent = userType === "parent";
  const dashboardPath = isParent ? "/parent/dashboard" : "/school/dashboard";
  const messagesPath = isParent ? "/parent/messages" : "/school/messages";
  
  const navItems = [
    {
      title: "Dashboard",
      path: dashboardPath,
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Mensagens",
      path: messagesPath,
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
  ];
  
  if (isParent) {
    navItems.push({
      title: "Notificações",
      path: "/parent/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    });
  }
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to={dashboardPath} className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-light to-green-water">
              Escola Conectada
            </span>
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6 ml-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center",
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to={dashboardPath} className="flex items-center mb-8">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-light to-green-water">
                Escola Conectada
              </span>
            </Link>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-light text-white">
                      {isParent ? "JP" : "EC"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
