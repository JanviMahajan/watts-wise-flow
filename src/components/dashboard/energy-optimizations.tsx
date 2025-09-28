import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Snowflake, Search, Wind } from "lucide-react"
import { useEnergyData } from "@/contexts/EnergyDataContext"

export function EnergyOptimizations() {
  const { predictions } = useEnergyData();
  
  // Calculate dynamic savings based on predicted cost
  const baseMonthlyPrediction = predictions?.predictedCost || 3000;
  
  const optimizations = [
    {
      title: "Switch to LED Lighting",
      description: "Replace incandescent bulbs with LED alternatives for better efficiency",
      savings: Math.round(baseMonthlyPrediction * 0.75), // 75% savings as mentioned in requirements
      priority: "High",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Refrigeration Optimization", 
      description: "Optimize refrigerator settings and maintenance for energy efficiency",
      savings: Math.round(baseMonthlyPrediction * 0.10), // 10% savings as mentioned
      priority: "Medium", 
      icon: Snowflake,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Energy Audit",
      description: "Conduct comprehensive energy audit to identify inefficiencies",
      savings: Math.round(baseMonthlyPrediction * 0.20),
      priority: "Medium",
      icon: Search,
      color: "text-green-600", 
      bgColor: "bg-green-50",
    },
    {
      title: "HVAC Optimization",
      description: "Optimize heating and cooling systems for maximum efficiency", 
      savings: Math.round(baseMonthlyPrediction * 0.15), // 15% savings as mentioned
      priority: "High",
      icon: Wind,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-green-600" />
          Energy Optimizations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {optimizations.map((optimization, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-lg ${optimization.bgColor}`}>
                <optimization.icon className={`h-5 w-5 ${optimization.color}`} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{optimization.title}</h4>
                  <Badge 
                    variant={optimization.priority === 'High' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {optimization.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{optimization.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Potential savings:</span>
                  <span className="text-sm font-semibold text-green-600">₹{optimization.savings}/month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}