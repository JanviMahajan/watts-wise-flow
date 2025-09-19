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
  X,
  Info
} from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getEnergyData } from "@/api"

export function AlertsPanel() {
  const { token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!token) return;
      
      try {
        // Check if user has uploaded data by calling energy-data endpoint
        const energyResponse = await getEnergyData(token);
        const hasData = energyResponse.data && energyResponse.data.length > 0;
        
        if (hasData) {
          // Generate smart alerts based on data
          const data = energyResponse.data;
          const alerts = [];
          
          if (data.length > 0) {
            const avgUsage = data.reduce((sum, entry) => sum + entry.kwh_consumed, 0) / data.length;
            const recentUsage = data.slice(0, 3).reduce((sum, entry) => sum + entry.kwh_consumed, 0) / Math.min(3, data.length);
            
            if (recentUsage > avgUsage * 1.2) {
              alerts.push({
                id: 1,
                type: "high_usage",
                severity: "warning",
                title: "Energy Usage Increasing",
                description: `Recent usage (${recentUsage.toFixed(1)} kWh) is ${((recentUsage/avgUsage-1)*100).toFixed(0)}% above your average`,
                timestamp: "Recent",
                location: "Overall"
              });
            } else if (recentUsage < avgUsage * 0.8) {
              alerts.push({
                id: 2,
                type: "efficiency",
                severity: "info",
                title: "Great Energy Efficiency!",
                description: `You're using ${((1-recentUsage/avgUsage)*100).toFixed(0)}% less energy than usual. Keep it up!`,
                timestamp: "Recent",
                location: "Overall"
              });
            }
          }
          
          setAlerts(alerts);
        } else {
          // Welcome message for new users
          setAlerts([
            {
              id: 1,
              type: "info",
              severity: "info",
              title: "Welcome to GreenOps!",
              description: "Upload some energy data to see personalized alerts and insights",
              timestamp: "Now",
              location: "Getting Started"
            }
          ]);
        }
      } catch (error) {
        console.error('Error generating alerts:', error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [token]);

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
  };

  const getAlertIcon = (type: string, severity: string) => {
    if (type === "high_usage") return TrendingUp;
    if (type === "maintenance") return Wrench;
    if (type === "efficiency") return Info;
    return AlertTriangle;
  };

  if (loading) {
    return (
      <Card className="col-span-3 animate-slide-up">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Loading alerts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Recent Alerts
        </CardTitle>
        <CardDescription>
          Monitor and manage energy consumption alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No alerts yet</p>
                <p className="text-sm text-muted-foreground">Upload energy data to see personalized alerts</p>
              </div>
            ) : (
              alerts.map((alert) => {
                const IconComponent = getAlertIcon(alert.type, alert.severity);
                return (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className={`rounded-full p-2 ${
                      alert.severity === 'critical' ? 'bg-destructive/10' :
                      alert.severity === 'high' ? 'bg-destructive/10' :
                      alert.severity === 'warning' ? 'bg-warning/10' :
                      'bg-info/10'
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        alert.severity === 'critical' ? 'text-destructive' :
                        alert.severity === 'high' ? 'text-destructive' :
                        alert.severity === 'warning' ? 'text-warning' :
                        'text-info'
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
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}