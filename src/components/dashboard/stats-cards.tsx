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
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getEnergyData } from "@/api"

export function StatsCards() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({
    totalUsage: 0,
    avgDaily: 0,
    estimatedCost: 0,
    efficiency: 0,
    alerts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;
      
      try {
        // Fetch energy data
        const response = await getEnergyData(token);
        if (response.data && response.data.length > 0) {
          const data = response.data;
          const totalUsage = data.reduce((sum, entry) => sum + entry.kwh_consumed, 0);
          const avgDaily = totalUsage / data.length;
          const estimatedCost = totalUsage * (user?.electricity_rate || 0.12);
          
          // Calculate efficiency score (simplified)
          const efficiency = Math.max(0, 100 - Math.min((avgDaily / 50) * 100, 100));
          
          // Fetch alerts count
          let alertsCount = 0;
          try {
            const alertsResponse = await fetch('http://localhost:8000/alerts', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const alertsData = await alertsResponse.json();
            alertsCount = alertsData.alerts ? alertsData.alerts.length : 0;
          } catch (error) {
            console.error('Error fetching alerts count:', error);
          }
          
          setStats({
            totalUsage: Math.round(totalUsage),
            avgDaily: Math.round(avgDaily * 10) / 10,
            estimatedCost: Math.round(estimatedCost * 100) / 100,
            efficiency: Math.round(efficiency),
            alerts: alertsCount
          });
        } else {
          // No data yet
          setStats({
            totalUsage: 0,
            avgDaily: 0,
            estimatedCost: 0,
            efficiency: 0,
            alerts: 0
          });
        }
      } catch (error) {
        console.error('Error fetching energy stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, user]);

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
          <div className="text-2xl font-bold">
            {loading ? "..." : `${stats.totalUsage} kWh`}
          </div>
          <p className="text-xs text-muted-foreground flex items-center mt-2">
            <TrendingUp className="h-3 w-3 mr-1 text-success" />
            This month
          </p>
          <Progress value={Math.min((stats.totalUsage / 1000) * 100, 100)} className="mt-3" />
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
          <div className="text-2xl font-bold">
            {loading ? "..." : `$${stats.estimatedCost}`}
          </div>
          <p className="text-xs text-muted-foreground flex items-center mt-2">
            <span>At ${(user?.electricity_rate || 0.12).toFixed(3)}/kWh</span>
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              {stats.estimatedCost > 0 ? "Calculated" : "No Data"}
            </Badge>
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
          <div className="text-2xl font-bold text-accent">
            {loading ? "..." : `${stats.efficiency}%`}
          </div>
          <p className="text-xs text-muted-foreground flex items-center mt-2">
            <TrendingUp className="h-3 w-3 mr-1 text-accent" />
            Based on usage patterns
          </p>
          <Progress value={stats.efficiency} className="mt-3" />
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
          <div className="text-2xl font-bold text-warning">
            {loading ? "..." : stats.alerts}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.alerts === 0 ? "No active alerts" : "Energy notifications"}
          </p>
          <div className="flex items-center gap-1 mt-3">
            {stats.alerts > 0 && (
              <>
                <Badge variant="destructive" className="text-xs">Active</Badge>
                <Badge variant="outline" className="text-xs">Monitor</Badge>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}