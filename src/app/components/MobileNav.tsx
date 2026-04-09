import { Link, useLocation, useNavigate } from "react-router";
import { ScanLine, BarChart3, GraduationCap, Moon, Sun, Menu, LogOut, X, ChevronRight, Home, Ticket } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { currentUser, allNavItems } from "./Sidebar";
import { LucernasLogo } from "./LucernasLogo";
import { useState } from "react";

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = allNavItems.filter(item => item.roles.includes(currentUser.role));

  const roleColors: Record<string, string> = {
    admin:     "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    governor:  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    organizer: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  };

  return (
    <>
      {/* ── Top mobile header ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2.5">
          <LucernasLogo size={30} />
          <span className="text-base font-bold text-primary">Lucernas</span>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-xl hover:bg-muted text-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Bottom tab bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border z-40 transition-colors duration-300">
        <div className="flex items-center justify-around px-1 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <Link key={item.path} to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all min-w-0 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-medium truncate max-w-[48px] text-center">{item.label}</span>
              </Link>
            );
          })}
          <button onClick={toggleTheme}
            className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl text-muted-foreground hover:text-primary transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
            <span className="text-[10px] font-medium">Theme</span>
          </button>
        </div>
      </div>

      {/* ── Slide-in drawer ── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative ml-auto w-72 h-full bg-card shadow-2xl flex flex-col" style={{ animation: "slideInRight 200ms ease both" }}>

            {/* Drawer header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <LucernasLogo size={38} />
                <div>
                  <p className="text-sm font-bold text-foreground">Lucernas</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${roleColors[currentUser.role] ?? "bg-muted text-muted-foreground"}`}>
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-xl hover:bg-muted text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Navigation</p>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
                return (
                  <Link key={item.path} to={item.path} onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                      isActive ? "bg-primary text-primary-foreground shadow-md" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {!isActive && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer bottom */}
            <div className="p-3 border-t border-border space-y-1">
              <button onClick={() => { navigate("/"); setDrawerOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-all text-sm font-medium">
                <Home className="w-5 h-5 shrink-0" />
                <span>Landing Page</span>
              </button>
              <button onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-all text-sm font-medium">
                {theme === "dark" ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <button onClick={() => { navigate("/login"); setDrawerOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all text-sm font-medium">
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
