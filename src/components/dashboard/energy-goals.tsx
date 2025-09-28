import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Plus } from "lucide-react"
import { useEnergyData } from "@/contexts/EnergyDataContext"

export function EnergyGoals() {
  const { totalUsage, totalCost, predictions } = useEnergyData();
  
  // Set target as 20% less than predicted usage/cost
  const targetUsage = Math.round((predictions?.predictedUsage || 3000) * 0.8);
  const targetCost = Math.round((predictions?.predictedCost || 9000) * 0.8);
  
  // Calculate progress based on current vs target
  const usageProgress = totalUsage > 0 ? Math.min((totalUsage / targetUsage) * 100, 100) : 0;
  const costProgress = totalCost > 0 ? Math.min((totalCost / targetCost) * 100, 100) : 0;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-blue-600" />
          Monthly Energy Target
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current vs Target */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Usage</span>
              <span className="text-sm font-medium">{totalUsage.toFixed(1)} kWh</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Target Usage</span>
              <span className="text-sm font-medium">{targetUsage} kWh</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium">{usageProgress.toFixed(0)}%</span>
              </div>
              <Progress 
                value={usageProgress} 
                className={`h-2 ${usageProgress > 100 ? 'bg-red-100' : ''}`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Cost</span>
              <span className="text-sm font-medium">₹{totalCost.toFixed(0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Target Cost</span>
              <span className="text-sm font-medium">₹{targetCost}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium">{costProgress.toFixed(0)}%</span>
              </div>
              <Progress 
                value={costProgress} 
                className={`h-2 ${costProgress > 100 ? 'bg-red-100' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className={`p-3 rounded-lg text-sm ${
          (usageProgress > 100 || costProgress > 100) 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : usageProgress > 80 || costProgress > 80
            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {(usageProgress > 100 || costProgress > 100) 
            ? '⚠️ You have exceeded your monthly energy target. Consider implementing optimizations.' 
            : usageProgress > 80 || costProgress > 80
            ? '📊 You are approaching your monthly target. Monitor usage carefully.'
            : '✅ You are on track to meet your monthly energy target. Keep up the good work!'
          }
        </div>

        {/* Add Goal Button */}
        <Button className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </CardContent>
    </Card>
  );
}