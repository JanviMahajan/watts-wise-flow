import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Plus } from "lucide-react"

export function EnergyGoals() {
  const goal = {
    title: "Monthly Energy Target",
    status: "In Progress",
    description: "Reduce monthly energy consumption by 10%",
    targetUsage: 13500,
    targetCost: 101250,
    period: "Monthly",
    currentProgress: 0,
    currentUsage: 7290,
    currentCost: 1219.08
  };

  const progressPercentage = (goal.currentUsage / goal.targetUsage) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Energy Goals</CardTitle>
        <Button size="sm" className="bg-black text-white hover:bg-gray-800">
          <Plus className="h-4 w-4 mr-1" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* Goal Status */}
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="font-medium">{goal.title}</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {goal.status}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {goal.description}
          </p>

          {/* Goal Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Target Usage:</span>
              <div className="font-semibold">{goal.targetUsage.toLocaleString()} kWh</div>
            </div>
            <div>
              <span className="text-muted-foreground">Target Cost:</span>
              <div className="font-semibold">₹{goal.targetCost.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Period:</span>
              <div className="font-semibold">{goal.period}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Current Progress:</span>
              <div className="font-semibold">{goal.currentProgress}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current: {goal.currentUsage.toLocaleString()} kWh</span>
              <span>Target: {goal.targetUsage.toLocaleString()} kWh</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              {Math.round(progressPercentage)}% of target reached
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-sm">
              <span className="text-muted-foreground">Current Cost: </span>
              <span className="font-semibold">₹{goal.currentCost}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              You're on track to reach your energy efficiency goal this month!
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}