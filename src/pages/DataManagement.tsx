import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

const DataManagement = () => {
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
              <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
              <p className="text-muted-foreground">
                Manage and organize your energy data across all systems
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="col-span-1 p-8 border border-dashed border-border rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Data Sources</h3>
                <p className="text-muted-foreground">Configure data sources and connections</p>
              </div>
              <div className="col-span-1 p-8 border border-dashed border-border rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Data Quality</h3>
                <p className="text-muted-foreground">Monitor and ensure data quality</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DataManagement;