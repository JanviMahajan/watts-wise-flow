import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

const Settings = () => {
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
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Configure your GreenOps preferences and settings
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <p className="text-muted-foreground">Notification settings coming soon</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Settings;