import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import DataManagement from "./pages/DataManagement";
import ImportData from "./pages/ImportData";
import Stores from "./pages/Stores";
import Locations from "./pages/Locations";
import Alerts from "./pages/Alerts";
import EnergyUsage from "./pages/EnergyUsage";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/data-management" element={<DataManagement />} />
      <Route path="/import-data" element={<ImportData />} />
      {user.user_type === 'shop' && (
        <>
          <Route path="/stores" element={<Stores />} />
          <Route path="/locations" element={<Locations />} />
        </>
      )}
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/energy-usage" element={<EnergyUsage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
