import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, Clock, Thermometer } from "lucide-react"
import { useEnergyData } from "@/contexts/EnergyDataContext"

export function EnergyPredictions() {
  const { predictions, isLoading } = useEnergyData();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-20 bg-muted rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-20 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Prediction Card */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Energy Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Predicted Usage</p>
              <p className="text-xl font-semibold">{predictions?.predictedUsage || 0} kWh</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Predicted Cost</p>
              <p className="text-xl font-semibold">₹{predictions?.predictedCost || 0}</p>
            </div>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Confidence Level</p>
              <p className="text-sm font-medium text-green-600">{predictions?.confidence || 0}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Trends */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-purple-600" />
            Usage Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Peak Usage Time</span>
              </div>
              <span className="text-sm font-medium">{predictions?.peakTime || "6-8 PM"}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Efficiency Trend</span>
              </div>
              <span className={`text-sm font-medium capitalize ${
                predictions?.trend === 'increasing' ? 'text-red-600' : 
                predictions?.trend === 'decreasing' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {predictions?.trend || 'stable'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Seasonal Impact</span>
              </div>
              <span className="text-sm font-medium capitalize">{predictions?.seasonalImpact || 'moderate'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}