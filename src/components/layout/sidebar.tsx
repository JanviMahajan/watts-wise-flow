import { 
  BarChart3, 
  Plus, 
  Upload, 
  TrendingUp, 
  Settings2,
  Target
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const navigationItems = [
  { label: "Dashboard", active: true },
  { label: "Add Usage", active: false },
  { label: "Upload CSV", active: false },
  { label: "Predictions", active: false },
  { label: "Optimizations", active: false },
  { label: "Goals", active: false },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className="px-4 py-6">
      {/* Navigation Tabs */}
      <nav className="space-y-2">
        {navigationItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${
              item.active 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}