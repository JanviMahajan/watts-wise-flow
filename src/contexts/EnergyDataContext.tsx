import React, { createContext, useContext, useState, useEffect } from 'react';
import { getEnergyData, getPredictions } from '@/api';
import { useAuth } from './AuthContext';

interface EnergyData {
  date: string;
  usage: number;
  cost: number;
  appliance?: string;
}

interface PredictionData {
  predictedUsage: number;
  predictedCost: number;
  confidence: number;
  peakTime: string;
  trend: string;
  seasonalImpact: string;
}

interface EnergyContextType {
  energyData: EnergyData[];
  predictions: PredictionData | null;
  totalUsage: number;
  totalCost: number;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateData: (newData: EnergyData[]) => void;
}

const EnergyDataContext = createContext<EnergyContextType | undefined>(undefined);

export function EnergyDataProvider({ children }: { children: React.ReactNode }) {
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const calculateTotals = (data: EnergyData[]) => {
    const totalUsage = data.reduce((sum, item) => sum + item.usage, 0);
    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    return { totalUsage, totalCost };
  };

  const generatePredictions = (data: EnergyData[]): PredictionData => {
    if (data.length === 0) {
      return {
        predictedUsage: 0,
        predictedCost: 0,
        confidence: 0,
        peakTime: "No data",
        trend: "stable",
        seasonalImpact: "low"
      };
    }

    const avgDailyUsage = data.reduce((sum, item) => sum + item.usage, 0) / data.length;
    const avgDailyCost = data.reduce((sum, item) => sum + item.cost, 0) / data.length;
    
    // Simple prediction: next month = average daily * 30
    const predictedUsage = Math.round(avgDailyUsage * 30);
    const predictedCost = Math.round(avgDailyCost * 30);
    
    // Calculate trend
    const recentData = data.slice(-7); // Last 7 days
    const olderData = data.slice(0, 7); // First 7 days
    const recentAvg = recentData.reduce((sum, item) => sum + item.usage, 0) / recentData.length;
    const olderAvg = olderData.reduce((sum, item) => sum + item.usage, 0) / olderData.length;
    
    let trend = "stable";
    if (recentAvg > olderAvg * 1.1) trend = "increasing";
    else if (recentAvg < olderAvg * 0.9) trend = "decreasing";

    return {
      predictedUsage,
      predictedCost,
      confidence: Math.min(95, data.length * 5), // Higher confidence with more data
      peakTime: "6-8 PM", // Default peak time
      trend,
      seasonalImpact: "moderate"
    };
  };

  const refreshData = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to fetch from backend, fallback to localStorage
      let data = [];
      try {
        const response = await getEnergyData(token);
        data = response.data || [];
      } catch (apiError) {
        // Fallback to localStorage
        const storedData = localStorage.getItem('energyData');
        if (storedData) {
          data = JSON.parse(storedData);
        }
      }
      
      setEnergyData(data);
      const predictionData = generatePredictions(data);
      setPredictions(predictionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (newData: EnergyData[]) => {
    setEnergyData(newData);
    localStorage.setItem('energyData', JSON.stringify(newData));
    const predictionData = generatePredictions(newData);
    setPredictions(predictionData);
  };

  useEffect(() => {
    refreshData();
  }, [token]);

  const { totalUsage, totalCost } = calculateTotals(energyData);

  const contextValue: EnergyContextType = {
    energyData,
    predictions,
    totalUsage,
    totalCost,
    isLoading,
    error,
    refreshData,
    updateData,
  };

  return (
    <EnergyDataContext.Provider value={contextValue}>
      {children}
    </EnergyDataContext.Provider>
  );
}

export function useEnergyData() {
  const context = useContext(EnergyDataContext);
  if (context === undefined) {
    throw new Error('useEnergyData must be used within an EnergyDataProvider');
  }
  return context;
}