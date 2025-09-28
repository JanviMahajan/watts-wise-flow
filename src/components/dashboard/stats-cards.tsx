import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Calendar, Target } from "lucide-react"
import { useEnergyData } from "@/contexts/EnergyDataContext"

export function StatsCards() {
  const { totalUsage, totalCost, predictions, isLoading } = useEnergyData();

  const stats = [
    {
      title: "Total Usage",
      value: isLoading ? "Loading..." : `${totalUsage.toFixed(1)} kWh`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Cost",
      value: isLoading ? "Loading..." : `₹${totalCost.toFixed(0)}`,
      icon: DollarSign,
      color: "text-green-600", 
      bgColor: "bg-green-50",
    },
    {
      title: "Next Month Forecast",
      value: isLoading ? "Loading..." : `${predictions?.predictedUsage || 0} kWh`,
      subtitle: `${predictions?.confidence || 0}% confidence`,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Potential Savings",
      value: isLoading ? "Loading..." : `₹${Math.round((predictions?.predictedCost || 0) * 0.15)}`,
      subtitle: "With optimizations",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}