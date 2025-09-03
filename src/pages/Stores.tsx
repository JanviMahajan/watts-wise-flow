import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Stores = () => {
  const stores = [
    { id: 1, name: "Store #1001", location: "New York, NY", status: "Active", consumption: "2,340 kWh" },
    { id: 2, name: "Store #1002", location: "Los Angeles, CA", status: "Active", consumption: "1,890 kWh" },
    { id: 3, name: "Store #1003", location: "Chicago, IL", status: "Warning", consumption: "3,120 kWh" },
    { id: 4, name: "Store #1004", location: "Houston, TX", status: "Active", consumption: "2,560 kWh" },
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
              <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
              <p className="text-muted-foreground">
                Monitor energy consumption across all store locations
              </p>
            </div>
            
            <div className="grid gap-4">
              {stores.map((store) => (
                <Card key={store.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                        <CardDescription>{store.location}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant={store.status === "Active" ? "default" : "destructive"}>
                          {store.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current consumption</span>
                      <span className="font-semibold">{store.consumption}</span>
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

export default Stores;