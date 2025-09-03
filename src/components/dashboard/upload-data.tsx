import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Download, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function UploadData() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadComplete(false)
    
    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    setIsUploading(false)
    setUploadComplete(true)
    
    toast({
      title: "Upload successful",
      description: `${file.name} has been processed and integrated into your energy data.`,
    })
  }

  const handleManualEntry = () => {
    toast({
      title: "Data entry saved",
      description: "Manual energy data has been recorded successfully.",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* CSV Upload */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV Data Upload
          </CardTitle>
          <CardDescription>
            Import energy consumption data from CSV files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csvFile">Select CSV File</Label>
            <Input 
              id="csvFile" 
              type="file" 
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Upload Location</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select store or location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="store-1247">Store #1247 - New York</SelectItem>
                <SelectItem value="store-0892">Store #0892 - Chicago</SelectItem>
                <SelectItem value="dc-texas">Distribution Center - Texas</SelectItem>
                <SelectItem value="headquarters">Headquarters - Arkansas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {uploadComplete && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Upload completed successfully</span>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              CSV Template
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Sample Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manual Data Entry */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle>Manual Data Entry</CardTitle>
          <CardDescription>
            Manually input energy consumption readings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Energy Reading (kWh)</Label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Cost ($)</Label>
              <Input type="number" placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="store-1247">Store #1247 - New York</SelectItem>
                <SelectItem value="store-0892">Store #0892 - Chicago</SelectItem>
                <SelectItem value="dc-texas">Distribution Center - Texas</SelectItem>
                <SelectItem value="headquarters">Headquarters - Arkansas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reading Date & Time</Label>
            <Input type="datetime-local" />
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea 
              placeholder="Add any additional notes about this reading..."
              className="min-h-[80px]"
            />
          </div>

          <Button onClick={handleManualEntry} className="w-full">
            Save Reading
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}