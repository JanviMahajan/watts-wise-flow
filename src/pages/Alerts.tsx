import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { EnergyGoals } from "@/components/dashboard/energy-goals"

const Alerts = () => {
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
              <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
              <p className="text-muted-foreground">
                Set and track your energy consumption targets
              </p>
            </div>
            
            <div className="max-w-3xl">
              <EnergyGoals />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Alerts;