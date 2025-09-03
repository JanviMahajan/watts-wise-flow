import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MapPin, Store, Calendar, Filter, X } from "lucide-react"

const activeFilters = [
  { id: 1, label: "United States", type: "country" },
  { id: 2, label: "High Usage Stores", type: "category" },
  { id: 3, label: "Last 30 Days", type: "date" },
]

export function Filters() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters & Controls
        </CardTitle>
        <CardDescription>
          Filter energy data by location, time period, and consumption patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Filters */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter.id} variant="secondary" className="flex items-center gap-1">
                {filter.label}
                <Button variant="ghost" size="sm" className="h-3 w-3 p-0">
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
            {activeFilters.length === 0 && (
              <span className="text-sm text-muted-foreground">No active filters</span>
            )}
          </div>
        </div>

        <Separator />

        {/* Country Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Country/Region
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="mx">Mexico</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Store Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store Type
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select store type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="superstore">Superstore</SelectItem>
              <SelectItem value="neighborhood">Neighborhood Market</SelectItem>
              <SelectItem value="distribution">Distribution Center</SelectItem>
              <SelectItem value="office">Corporate Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Label>
          <DatePickerWithRange />
        </div>

        {/* Energy Range Filter */}
        <div className="space-y-2">
          <Label>Energy Usage Range (kWh)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Min" type="number" />
            <Input placeholder="Max" type="number" />
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1">Apply Filters</Button>
          <Button variant="outline">Reset All</Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Showing data for 847 locations matching current filters
        </div>
      </CardContent>
    </Card>
  )
}