import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  DollarSign, 
  AlertTriangle,
  Target
} from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Consumption */}
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Consumption
          </CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231 kWh</div>
          <p className="text-xs text-muted-foreground flex items-center mt-2">
            <TrendingUp className="h-3 w-3 mr-1 text-success" />
            +20.1% from last month
          </p>
          <Progress value={73} className="mt-3" />
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Energy Cost
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,234</div>
          <p className="text-xs text-muted-foreground flex items-center mt-2">
            <TrendingDown className="h-3 w-3 mr-1 text-success" />
            -4.3% from last month
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">Optimized</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Efficiency Score */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Efficiency Score
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">87.2%</div>
          <p className="text-xs text-muted-foreground flex items-center mt-2">
            <TrendingUp className="h-3 w-3 mr-1 text-accent" />
            +12.5% improvement
          </p>
          <Progress value={87.2} className="mt-3" />
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Alerts
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">3</div>
          <p className="text-xs text-muted-foreground mt-2">
            2 high usage, 1 maintenance
          </p>
          <div className="flex items-center gap-1 mt-3">
            <Badge variant="destructive" className="text-xs">High</Badge>
            <Badge variant="outline" className="text-xs">Medium</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}