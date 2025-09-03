import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Locations = () => {
  const locations = [
    { name: "North America", stores: 45, consumption: "125,340 kWh", efficiency: "Good" },
    { name: "Europe", stores: 32, consumption: "89,230 kWh", efficiency: "Excellent" },
    { name: "Asia Pacific", stores: 28, consumption: "67,890 kWh", efficiency: "Good" },
    { name: "South America", stores: 15, consumption: "34,120 kWh", efficiency: "Fair" },
  ];

  return (
    <ThemeProvider defaultTheme="light" storageKey="greenops-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <aside className="w-64 border-r bg-card/50">
            <Sidebar />
          </aside>
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
              <p className="text-muted-foreground">
                Energy consumption overview by geographical regions
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {locations.map((location, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription>{location.stores} stores in this region</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total consumption</span>
                      <span className="font-semibold">{location.consumption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Efficiency rating</span>
                      <span className="font-semibold">{location.efficiency}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Locations;