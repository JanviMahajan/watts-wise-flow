import { 
  BarChart3, 
  Plus, 
  Upload, 
  TrendingUp, 
  Settings2,
  Target
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const navigationItems = [
  { label: "Dashboard", path: "/", icon: BarChart3 },
  { label: "Add Usage", path: "/energy-usage", icon: Plus },
  { label: "Upload CSV", path: "/import-data", icon: Upload },
  { label: "Predictions", path: "/analytics", icon: TrendingUp },
  { label: "Optimizations", path: "/data-management", icon: Settings2 },
  { label: "Goals", path: "/alerts", icon: Target },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="px-4 py-6">
      {/* Navigation Tabs */}
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-full px-4 py-2 text-left rounded-lg transition-colors flex items-center gap-3 ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}