import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingDown, Clock, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getOptimizationTips } from "@/api";

interface OptimizationTip {
  id: string;
  title: string;
  description: string;
  potential_savings: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export function OptimizationTips() {
  const { user, token } = useAuth();
  const [tips, setTips] = useState<OptimizationTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTips() {
      if (!token || !user) return;
      
      try {
        const data = await getOptimizationTips(token, user.user_type);
        setTips(data.tips || []);
      } catch (error) {
        console.error('Failed to fetch optimization tips:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTips();
  }, [token, user]);

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Zap className="h-4 w-4 text-success" />;
      case 'medium': return <Clock className="h-4 w-4 text-warning" />;
      case 'hard': return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Optimization Tips
        </CardTitle>
        <CardDescription>
          {user?.user_type === 'house' 
            ? 'Personalized tips to reduce your home energy consumption'
            : 'Business-focused strategies to optimize energy usage'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.length === 0 ? (
          <p className="text-muted-foreground text-sm">No optimization tips available yet.</p>
        ) : (
          tips.map((tip) => (
            <div key={tip.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">{tip.title}</h4>
                {getDifficultyIcon(tip.difficulty)}
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant={getDifficultyColor(tip.difficulty)} className="text-xs">
                  {tip.difficulty}
                </Badge>
                {tip.potential_savings && (
                  <Badge variant="outline" className="text-xs">
                    Save {tip.potential_savings}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {tip.category}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}