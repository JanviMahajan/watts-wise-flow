import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

const Analytics = () => {
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
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">
                Advanced analytics and insights for energy consumption patterns
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="col-span-1 p-8 border border-dashed border-border rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Energy Trends</h3>
                <p className="text-muted-foreground">Detailed trend analysis coming soon</p>
              </div>
              <div className="col-span-1 p-8 border border-dashed border-border rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                <p className="text-muted-foreground">Performance insights coming soon</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Analytics;