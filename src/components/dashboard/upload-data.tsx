import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { uploadCSV } from "@/api"
import { toast } from "sonner"
import { ManualEntry } from "./manual-entry"

export function UploadData() {
  const { user, token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [branchName, setBranchName] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !token) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadCSV(
        file, 
        token, 
        user?.user_type === 'shop' ? branchName : null
      );
      
      if (result.success) {
        toast.success('CSV uploaded successfully');
        setBranchName('');
        // Reset the input
        event.target.value = '';
      } else {
        toast.error(result.message || 'Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Energy Data
          </CardTitle>
          <CardDescription>
            Upload your energy consumption data via CSV file
            {user?.user_type === 'shop' && ' for each branch/store'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user?.user_type === 'shop' && (
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch/Store Name</Label>
              <Input
                id="branchName"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="Enter branch or store name"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="csvFile">CSV File</Label>
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={uploading || (user?.user_type === 'shop' && !branchName)}
            />
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">CSV Format Requirements:</p>
              <ul className="space-y-1 text-xs">
                <li>• Columns: date, kwh_consumed</li>
                <li>• Date format: YYYY-MM-DD</li>
                <li>• Energy values in kWh (decimal allowed)</li>
              </ul>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            disabled={uploading || (user?.user_type === 'shop' && !branchName)}
          >
            <FileText className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Select CSV File to Upload'}
          </Button>
        </CardContent>
      </Card>

      <ManualEntry />
    </div>
  )
}