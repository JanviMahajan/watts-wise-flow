import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
              <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
              <p className="text-muted-foreground">
                Monitor critical energy usage alerts and system notifications
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="col-span-1">
                <AlertsPanel />
              </div>
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Settings</CardTitle>
                    <CardDescription>Configure your alert preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-dashed border-border rounded-lg text-center">
                      <p className="text-muted-foreground">Alert configuration coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Alerts;