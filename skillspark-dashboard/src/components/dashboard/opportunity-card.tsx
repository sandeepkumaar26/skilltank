"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Calendar, DollarSign, Building2, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface OpportunityCardProps {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
  };
  tags: string[];
  location: string;
  type: 'internship' | 'job';
  compensation: string;
  deadline: Date;
  isRemote?: boolean;
  description?: string;
  onViewDetails: (id: string) => void;
  className?: string;
}

function formatDeadline(date: Date): string {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return "Expired";
  } else if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "1 day left";
  } else if (diffDays <= 30) {
    return `${diffDays} days left`;
  } else {
    return date.toLocaleDateString();
  }
}

export function OpportunityCard({
  id,
  title,
  company,
  tags,
  location,
  type,
  compensation,
  deadline,
  isRemote = false,
  description,
  onViewDetails,
  className,
}: OpportunityCardProps) {
  const deadlineText = formatDeadline(deadline);
  const isExpired = deadline.getTime() < Date.now();
  
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md hover:-translate-y-1",
      isExpired && "opacity-60",
      className
    )}>
      <CardContent className="p-6">
        {/* Company Logo and Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {company.logo && company.logo !== "/placeholder-logo.jpg" ? (
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {company.name}
            </p>
          </div>
          <Badge variant={type === 'internship' ? 'secondary' : 'default'}>
            {type === 'internship' ? 'Internship' : 'Job'}
          </Badge>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
            {isRemote && (
              <Badge variant="outline" className="text-xs">
                Remote
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{compensation}</span>
          </div>
          
          <div className={cn(
            "flex items-center gap-2 text-sm",
            isExpired ? "text-red-500" : "text-muted-foreground"
          )}>
            <Clock className="h-4 w-4" />
            <span>{deadlineText}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onViewDetails(id)}
          disabled={isExpired}
          className="w-full"
        >
          {isExpired ? 'Expired' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function OpportunityCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-lg bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
        </div>
        
        <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-4" />
        
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-14 bg-muted animate-pulse rounded-full" />
        </div>
        
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="h-10 w-full bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
}