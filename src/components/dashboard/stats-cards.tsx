import { Card, CardContent } from "@/components/ui/card"
import { Zap, DollarSign, TrendingUp, Lightbulb } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getEnergyData } from "@/api"

export function StatsCards() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({
    totalUsage: 7290,
    totalCost: 1219.08,
    nextMonthForecast: 1826.62,
    potentialSavings: 248
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
          const totalCost = totalUsage * (user?.electricity_rate || 0.167); // ₹0.167 per kWh
          const nextMonthForecast = totalCost * 1.5; // 50% increase forecast
          const potentialSavings = totalCost * 0.2; // 20% potential savings
          
          setStats({
            totalUsage: Math.round(totalUsage),
            totalCost: Math.round(totalCost * 100) / 100,
            nextMonthForecast: Math.round(nextMonthForecast * 100) / 100,
            potentialSavings: Math.round(potentialSavings * 100) / 100
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

  const statCards = [
    {
      title: "Total Usage",
      value: loading ? "..." : `${stats.totalUsage} kWh`,
      subtitle: "Jun - Jun 3 kWh/day",
      icon: Zap,
      iconColor: "text-blue-500"
    },
    {
      title: "Total Cost",
      value: loading ? "..." : `₹${stats.totalCost}`,
      subtitle: "",
      icon: DollarSign,
      iconColor: "text-green-500"
    },
    {
      title: "Next Month Forecast",
      value: loading ? "..." : `₹${stats.nextMonthForecast}`,
      subtitle: "",
      icon: TrendingUp,
      iconColor: "text-orange-500"
    },
    {
      title: "Potential Savings",
      value: loading ? "..." : `₹${stats.potentialSavings}`,
      subtitle: "",
      icon: Lightbulb,
      iconColor: "text-yellow-500"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{card.title}</span>
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              {card.subtitle && (
                <div className="text-xs text-muted-foreground">{card.subtitle}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}