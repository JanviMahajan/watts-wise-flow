import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Refrigerator, FileSearch, Thermometer } from "lucide-react"

export function EnergyOptimizations() {
  const optimizations = [
    {
      id: 1,
      title: "Switch to LED Lighting",
      description: "Replace incandescent bulbs with LED bulbs to reduce lighting energy costs by up to 75%",
      savings: "₹106/month",
      priority: "medium",
      icon: Lightbulb,
      iconColor: "text-yellow-500"
    },
    {
      id: 2,
      title: "Optimize Refrigeration Usage",  
      description: "Improve energy-saving practices for your refrigeration to reduce consumption by up to 10%",
      savings: "₹36/month",
      priority: "medium", 
      icon: Refrigerator,
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      title: "Conduct Energy Audit",
      description: "Schedule a professional energy audit to identify additional saving opportunities specific to your usage patterns",
      savings: "₹61/month",
      priority: "low",
      icon: FileSearch,
      iconColor: "text-green-500"
    },
    {
      id: 4,
      title: "Optimize HVAC Settings",
      description: "Adjust thermostat by 1-2 degrees and schedule regular maintenance to reduce HVAC energy consumption by up to 15%",
      savings: "₹45/month",
      priority: "high",
      icon: Thermometer,
      iconColor: "text-red-500"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Energy Optimizations</CardTitle>
        <Button variant="outline" size="sm">
          Generate Optimizations
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimizations.map((optimization) => {
          const Icon = optimization.icon;
          return (
            <div key={optimization.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${optimization.iconColor}`} />
                  <div>
                    <h4 className="font-medium">{optimization.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${getPriorityColor(optimization.priority)}`}
                    >
                      {optimization.priority}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-success font-semibold">💡 Save {optimization.savings}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                {optimization.description}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  )
}