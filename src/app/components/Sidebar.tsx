import { Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Ticket, ScanLine, BarChart3, GraduationCap, LogOut, Sun, Moon, X, Home } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { LucernasLogo } from "./LucernasLogo";

// 🔐 TEMP USER — replace with Firebase auth later
// Change role to test: "admin" | "governor" | "organizer"
export const currentUser = {
  role: "admin" as "admin" | "governor" | "organizer",
  name: "Admin User",
};

const roleLabels: Record<string, string> = {
  admin: "Admin",
  governor: "Governor",
  organizer: "Organizer",
};

export const allNavItems = [
  { icon: LayoutDashboard, label: "Dashboard",        path: "/admin",            roles: ["admin", "governor"] },
  { icon: Ticket,          label: "Ticket Generation", path: "/tickets/generate", roles: ["admin"] },
  { icon: BarChart3,       label: "Analytics",         path: "/analytics",        roles: ["admin"] },
  { icon: GraduationCap,   label: "College Dashboard", path: "/college",          roles: ["admin", "governor", "organizer"] },
  { icon: ScanLine,        label: "QR Scanner",        path: "/scanner",          roles: ["organizer"] },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navItems = allNavItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border min-h-screen transition-colors duration-300 shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 min-w-0" onClick={onClose}>
          <LucernasLogo size={36} />
          <span className="text-lg font-bold text-primary truncate">Lucernas</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted text-muted-foreground ml-2">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role badge */}
      <div className="px-4 pt-4 pb-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
          {roleLabels[currentUser.role] ?? currentUser.role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pb-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => { navigate("/"); onClose?.(); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-all text-sm font-medium"
        >
          <Home className="w-5 h-5 shrink-0" />
          <span>Landing Page</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-all text-sm font-medium"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button
          onClick={() => { navigate("/login"); onClose?.(); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all text-sm font-medium"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export function DesktopSidebar() {
  return (
    <div className="hidden md:flex">
      <Sidebar />
    </div>
  );
}
