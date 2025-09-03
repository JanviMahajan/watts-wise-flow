import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "00:00", current: 2400, predicted: 2380, efficient: 2200 },
  { name: "04:00", current: 1398, predicted: 1420, efficient: 1300 },
  { name: "08:00", current: 9800, predicted: 9600, efficient: 8800 },
  { name: "12:00", current: 3908, predicted: 4200, efficient: 3600 },
  { name: "16:00", current: 4800, predicted: 4900, efficient: 4200 },
  { name: "20:00", current: 3800, predicted: 3750, efficient: 3400 },
  { name: "24:00", current: 4300, predicted: 4100, efficient: 3800 },
]

export function EnergyChart() {
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
          <LineChart data={data}>
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
              tickFormatter={(value) => `${value}kWh`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Time
                          </span>
                          <span className="font-bold">{label}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {payload.map((entry, index) => (
                          <div key={index} className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {entry.dataKey === 'current' && 'Current'}
                              {entry.dataKey === 'predicted' && 'Predicted'}
                              {entry.dataKey === 'efficient' && 'Target'}
                            </span>
                            <span className="font-bold" style={{ color: entry.color }}>
                              {entry.value}kWh
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="current"
              strokeWidth={3}
              stroke="hsl(var(--primary))"
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              strokeWidth={2}
              stroke="hsl(var(--accent))"
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="efficient"
              strokeWidth={2}
              stroke="hsl(var(--success))"
              dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}