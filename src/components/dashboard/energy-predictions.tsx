import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Thermometer } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function EnergyPredictions() {
  const { token } = useAuth();
  const [predictions, setPredictions] = useState({
    nextMonthUsage: 10935,
    predictedCost: 1826.62,
    confidence: 96,
    peakUsageTime: "6-9 PM",
    efficiencyTrend: "15% more efficient last month",
    seasonalImpact: "Summer months typically increase usage by 25%"
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Next Month Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Month Prediction</CardTitle>
          <p className="text-sm text-muted-foreground">Generate from historical data</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Predicted Usage:</span>
              <span className="font-semibold">{predictions.nextMonthUsage.toLocaleString()} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Predicted Cost:</span>
              <span className="font-semibold">₹{predictions.predictedCost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <span className="font-semibold text-success">{predictions.confidence}%</span>
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              ⚡ Based on your usage patterns over the last 90 days, we predict your next month's energy consumption.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Generate New Prediction Button */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generate New Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Generate New Prediction
          </button>
        </CardContent>
      </Card>

      {/* Usage Trends */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Usage Trends</CardTitle>
          <p className="text-sm text-muted-foreground">Historical patterns and insights</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-blue-700">Peak Usage Times</span>
              </div>
              <p className="text-sm text-blue-600">{predictions.peakUsageTime}</p>
              <p className="text-xs text-blue-500 mt-1">Evening hours show highest consumption</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium text-green-700">Efficiency Trend</span>
              </div>
              <p className="text-sm text-green-600">{predictions.efficiencyTrend}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-orange-700">Seasonal Impact</span>
              </div>
              <p className="text-sm text-orange-600">{predictions.seasonalImpact}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}