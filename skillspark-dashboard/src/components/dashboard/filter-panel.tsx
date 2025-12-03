"use client";

import * as React from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FilterConfig {
  key: string;
  type: 'select' | 'range' | 'toggle' | 'date';
  label: string;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
}

export interface FilterValues {
  [key: string]: any;
}

export interface FilterPanelProps {
  filters: FilterConfig[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
  className?: string;
  collapsible?: boolean;
}

export function FilterPanel({
  filters,
  values,
  onChange,
  onReset,
  className,
  collapsible = true,
}: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  const activeFiltersCount = Object.values(values).filter(value => 
    value !== undefined && value !== null && value !== '' && value !== false
  ).length;

  const handleFilterChange = (key: string, value: any) => {
    const newValues = { ...values, [key]: value };
    onChange(newValues);
  };

  const handleReset = () => {
    onReset();
  };

  const renderFilter = (filter: FilterConfig) => {
    const value = values[filter.key];

    switch (filter.type) {
      case 'select':
        return (
          <div key={filter.key} className="space-y-2">
            <Label className="text-sm font-medium">{filter.label}</Label>
            <Select
              value={value || ''}
              onValueChange={(newValue) => handleFilterChange(filter.key, newValue)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'toggle':
        return (
          <div key={filter.key} className="flex items-center justify-between">
            <Label htmlFor={filter.key} className="text-sm font-medium">
              {filter.label}
            </Label>
            <Switch
              id={filter.key}
              checked={value || false}
              onCheckedChange={(checked) => handleFilterChange(filter.key, checked)}
            />
          </div>
        );

      case 'range':
        return (
          <div key={filter.key} className="space-y-2">
            <Label className="text-sm font-medium">{filter.label}</Label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={filter.min}
                max={filter.max}
                value={value?.min || ''}
                onChange={(e) => handleFilterChange(filter.key, {
                  ...value,
                  min: e.target.value ? Number(e.target.value) : undefined,
                })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Min"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <input
                type="number"
                min={filter.min}
                max={filter.max}
                value={value?.max || ''}
                onChange={(e) => handleFilterChange(filter.key, {
                  ...value,
                  max: e.target.value ? Number(e.target.value) : undefined,
                })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Max"
              />
            </div>
          </div>
        );

      case 'date':
        return (
          <div key={filter.key} className="space-y-2">
            <Label className="text-sm font-medium">{filter.label}</Label>
            <input
              type="date"
              value={value || ''}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={cn("transition-all duration-200", className)}>
      <CardHeader 
        className={cn(
          "pb-3",
          collapsible && "cursor-pointer hover:bg-muted/50"
        )}
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="h-6 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
            {collapsible && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            )}
          </div>
        </div>
      </CardHeader>

      {(!collapsible || !isCollapsed) && (
        <CardContent className="space-y-4">
          {filters.map((filter, index) => (
            <div key={filter.key}>
              {renderFilter(filter)}
              {index < filters.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

// Predefined filter configurations for common use cases
export const opportunityFilters: FilterConfig[] = [
  {
    key: 'domain',
    type: 'select',
    label: 'Domain',
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'data', label: 'Data Science' },
      { value: 'product', label: 'Product Management' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'business', label: 'Business Development' },
      { value: 'finance', label: 'Finance' },
      { value: 'operations', label: 'Operations' },
    ],
  },
  {
    key: 'duration',
    type: 'select',
    label: 'Duration',
    options: [
      { value: '1-3', label: '1-3 months' },
      { value: '3-6', label: '3-6 months' },
      { value: '6-12', label: '6-12 months' },
      { value: '12+', label: '12+ months' },
    ],
  },
  {
    key: 'compensation',
    type: 'range',
    label: 'Compensation (₹/month)',
    min: 0,
    max: 100000,
  },
  {
    key: 'remote',
    type: 'toggle',
    label: 'Remote Work',
  },
  {
    key: 'deadline',
    type: 'date',
    label: 'Apply Before',
  },
];