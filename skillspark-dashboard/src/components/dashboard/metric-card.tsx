"use client";

import * as React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}


export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary',
  className,
}: MetricCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-row items-center justify-between space-y-0 p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold">
            {value}
          </p>
          {trend && (
            <div className="flex items-center space-x-1">
              {trend.direction === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={cn(
                "text-xs font-medium",
                trend.direction === 'up' ? "text-green-600" : "text-red-600"
              )}>
                {trend.direction === 'up' ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">from last month</span>
            </div>
          )}
        </div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-12 w-12 animate-pulse rounded-lg bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}