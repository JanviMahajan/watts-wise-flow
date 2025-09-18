import { 
  BarChart3, 
  Database, 
  Upload, 
  AlertTriangle, 
  Settings, 
  MapPin,
  Store,
  TrendingUp,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button 
              variant={location.pathname === "/" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start", location.pathname === "/" && "bg-gradient-primary text-primary-foreground")}
              asChild
            >
              <NavLink to="/">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </NavLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </NavLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/data-management">
                <Database className="mr-2 h-4 w-4" />
                Data Management
              </NavLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/import-data">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </NavLink>
            </Button>
          </div>
        </div>
        
        {user?.user_type === 'shop' && (
          <>
            <Separator />
            
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">
                Business
              </h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <NavLink to="/stores">
                    <Store className="mr-2 h-4 w-4" />
                    Stores
                  </NavLink>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <NavLink to="/locations">
                    <MapPin className="mr-2 h-4 w-4" />
                    Locations
                  </NavLink>
                </Button>
              </div>
            </div>
          </>
        )}

        <Separator />
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">
            Monitoring
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/alerts">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Alerts
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                  3
                </span>
              </NavLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/energy-usage">
                <Zap className="mr-2 h-4 w-4" />
                Energy Usage
              </NavLink>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="px-3 py-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <NavLink to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  )
}