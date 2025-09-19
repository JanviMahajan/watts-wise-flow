import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getEnergyData, getPredictions } from "@/api"

export function EnergyChart() {
  const { token, user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!token) return;
      
      try {
        // Fetch actual energy data
        const energyResponse = await getEnergyData(token);
        const energyData = energyResponse.data || [];
        
        // Fetch predictions
        const predictionsResponse = await getPredictions(token);
        const predictions = predictionsResponse.predictions || [];
        
        // Combine and format data for chart
        const combinedData = [];
        
        // Add historical data (last 7 days)
        const recentData = energyData.slice(0, 7).reverse();
        recentData.forEach(entry => {
          combinedData.push({
            name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            current: entry.kwh_consumed,
            predicted: null,
            efficient: entry.kwh_consumed * 0.85 // 15% efficiency target
          });
        });
        
        // Add prediction data
        predictions.slice(0, 5).forEach(pred => {
          combinedData.push({
            name: new Date(pred.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            current: null,
            predicted: pred.predicted_kwh,
            efficient: pred.predicted_kwh * 0.85
          });
        });
        
        // If no data, show sample data
        if (combinedData.length === 0) {
          const sampleData = [
            { name: "Upload", current: null, predicted: null, efficient: null },
            { name: "Energy", current: null, predicted: null, efficient: null },
            { name: "Data", current: null, predicted: null, efficient: null },
            { name: "To See", current: null, predicted: null, efficient: null },
            { name: "Charts", current: null, predicted: null, efficient: null },
          ];
          setChartData(sampleData);
        } else {
          setChartData(combinedData);
        }
        
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [token, user]);

  if (loading) {
    return (
      <Card className="col-span-4 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">Energy Usage Overview</CardTitle>
          <CardDescription>Loading energy consumption data...</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Energy Usage Overview</CardTitle>
        <CardDescription>
          Real-time energy consumption vs predictions and efficiency targets
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value ? `${value}kWh` : ''}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold">{label}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {payload.map((entry, index) => (
                          entry.value !== null && (
                            <div key={index} className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {entry.dataKey === 'current' && 'Actual'}
                                {entry.dataKey === 'predicted' && 'Predicted'}
                                {entry.dataKey === 'efficient' && 'Target'}
                              </span>
                              <span className="font-bold" style={{ color: entry.color }}>
                                {entry.value ? Math.round((entry.value as number) * 10) / 10 : 0}kWh
                              </span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="current"
              strokeWidth={3}
              stroke="hsl(var(--primary))"
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              name="Current Usage"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              strokeWidth={2}
              stroke="hsl(var(--accent))"
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
              name="Predicted"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="efficient"
              strokeWidth={2}
              stroke="hsl(var(--success))"
              dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 3 }}
              name="Efficiency Target"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}