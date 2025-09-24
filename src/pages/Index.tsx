import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { UploadData } from "@/components/dashboard/upload-data"
import { EnergyPredictions } from "@/components/dashboard/energy-predictions"
import { EnergyOptimizations } from "@/components/dashboard/energy-optimizations"
import { EnergyGoals } from "@/components/dashboard/energy-goals"
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
            {/* Stats Cards - Top Summary */}
            <StatsCards />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                <UploadData />
                <EnergyOptimizations />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <EnergyPredictions />
                <EnergyGoals />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
