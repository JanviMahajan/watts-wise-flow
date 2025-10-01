import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { ManualEntry } from "@/components/dashboard/manual-entry"

const EnergyUsage = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="greenops-ui-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex flex-1">
          <aside className="w-64 border-r bg-card/50">
            <Sidebar />
          </aside>
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Add Usage</h1>
              <p className="text-muted-foreground">
                Manually enter your energy consumption data
              </p>
            </div>
            
            <div className="max-w-2xl">
              <ManualEntry />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default EnergyUsage;