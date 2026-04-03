import { Link, useNavigate } from "react-router";
import { Bell, User, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="C:\Users\sujay\OneDrive\Documents\My docs\web dev projects\Edge AI\logo.jpeg" alt="" />
          <span className="text-xl font-bold text-white">Edge AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Portfolio
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-300 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] flex items-center justify-center text-white">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-300 hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>  */}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-gray-300 hover:text-white"
          >
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
