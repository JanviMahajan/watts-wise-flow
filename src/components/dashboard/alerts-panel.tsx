import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  AlertTriangle, 
  TrendingUp, 
  Wrench, 
  MapPin,
  Clock,
  X
} from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "high_usage",
    severity: "critical",
    title: "Critical Energy Spike Detected",
    location: "Store #1247 - New York",
    description: "Energy consumption 340% above baseline during off-peak hours",
    timestamp: "2 minutes ago",
    icon: TrendingUp,
  },
  {
    id: 2,
    type: "maintenance",
    severity: "warning",
    title: "HVAC System Maintenance Required",
    location: "Store #0892 - Chicago",
    description: "Efficiency dropped 15% - schedule maintenance check",
    timestamp: "1 hour ago",
    icon: Wrench,
  },
  {
    id: 3,
    type: "high_usage",
    severity: "high",
    title: "Unusual Peak Hour Consumption",
    location: "Distribution Center - Texas",
    description: "220% increase in lighting energy usage detected",
    timestamp: "3 hours ago",
    icon: TrendingUp,
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive"
    case "high":
      return "destructive" 
    case "warning":
      return "secondary"
    default:
      return "secondary"
  }
}

export function AlertsPanel() {
  return (
    <Card className="col-span-3 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Recent Alerts
        </CardTitle>
        <CardDescription>
          Monitor and manage energy consumption alerts across all locations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className={`rounded-full p-2 ${
                  alert.severity === 'critical' ? 'bg-destructive/10' :
                  alert.severity === 'high' ? 'bg-destructive/10' :
                  'bg-warning/10'
                }`}>
                  <alert.icon className={`h-4 w-4 ${
                    alert.severity === 'critical' ? 'text-destructive' :
                    alert.severity === 'high' ? 'text-destructive' :
                    'text-warning'
                  }`} />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{alert.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs capitalize">
                        {alert.severity}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{alert.location}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}