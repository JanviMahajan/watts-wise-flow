import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addManualEntry } from "@/api";
import { toast } from "sonner";

export function ManualEntry() {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    kwh_consumed: '',
    branch_name: '',
    period_type: 'daily'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const data = {
        date: formData.date,
        kwh_consumed: parseFloat(formData.kwh_consumed),
        period_type: formData.period_type,
        ...(user?.user_type === 'shop' && { branch_name: formData.branch_name })
      };

      await addManualEntry(data, token);
      toast.success('Energy data added successfully');
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        kwh_consumed: '',
        branch_name: '',
        period_type: 'daily'
      });
    } catch (error) {
      toast.error('Failed to add energy data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Manual Data Entry
        </CardTitle>
        <CardDescription>
          Enter your energy consumption manually
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kwh">Energy Consumed (kWh)</Label>
              <Input
                id="kwh"
                type="number"
                step="0.01"
                value={formData.kwh_consumed}
                onChange={(e) => setFormData({ ...formData, kwh_consumed: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Period Type</Label>
              <Select 
                value={formData.period_type}
                onValueChange={(value) => setFormData({ ...formData, period_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {user?.user_type === 'shop' && (
              <div className="space-y-2">
                <Label htmlFor="branch">Branch/Store Name</Label>
                <Input
                  id="branch"
                  value={formData.branch_name}
                  onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })}
                  placeholder="Enter branch name"
                  required
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Energy Data'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}