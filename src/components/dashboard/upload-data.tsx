import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { uploadCSV } from "@/api"
import { toast } from "sonner"

export function UploadData() {
  const { user, token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file || !token) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadCSV(file, token, null);
      
      if (result.success) {
        toast.success('CSV uploaded successfully');
      } else {
        toast.error(result.message || 'Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          CSV Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Upload energy data from a CSV file
        </p>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Select a file from your device
          </p>
          <Button 
            variant="outline" 
            onClick={openFileSelector}
            disabled={uploading}
            className="mb-4"
          >
            <FileText className="mr-2 h-4 w-4" />
            Choose File
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* CSV Format Info */}
        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">CSV Format: Usage must experience</p>
            <p className="text-xs">Headers: date, kwh_consumed</p>
          </div>
        </div>

        {/* Upload Button */}
        <Button 
          className="w-full bg-gray-600 hover:bg-gray-700 text-white" 
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload CSV'}
        </Button>
      </CardContent>
    </Card>
  )
}