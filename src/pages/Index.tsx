import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { EnergyChart } from "@/components/dashboard/energy-chart"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { Filters } from "@/components/dashboard/filters"
import { UploadData } from "@/components/dashboard/upload-data"
import { OptimizationTips } from "@/components/dashboard/optimization-tips"
import { useAuth } from "@/contexts/AuthContext"

const Index = () => {
  const { user } = useAuth();

  return (
    <ThemeProvider defaultTheme="light" storageKey="greenops-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <aside className="w-64 border-r bg-card/50">
            <Sidebar />
          </aside>
          <main className="flex-1 p-6 space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {user?.user_type === 'house' ? 'Home Energy Dashboard' : 'Business Energy Dashboard'}
              </h1>
              <p className="text-muted-foreground">
                {user?.user_type === 'house' 
                  ? 'Monitor and optimize your home energy consumption'
                  : 'Monitor and optimize energy consumption across all locations'
                }
              </p>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Dashboard Grid */}
            <div className="grid gap-6 md:grid-cols-7">
              <div className="col-span-4 space-y-6">
                <EnergyChart />
                <UploadData />
              </div>
              <div className="col-span-3 space-y-6">
                {user?.user_type === 'shop' && <Filters />}
                <AlertsPanel />
                <OptimizationTips />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
