"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, IndianRupee, Star, Bookmark, EyeOff, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type OpportunityItem = {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    rating?: number;
    reviewsCount?: number;
  };
  experience?: string; // e.g., "0-2 Yrs"
  salary?: string; // e.g., "2-4 Lacs PA" or "₹25,000/month"
  location: string; // city
  postedAgo?: string; // e.g., "1 Day ago"
  description?: string;
  skills?: string[];
  promoted?: boolean;
};

export function OpportunityListItem({
  item,
  selected,
  onSelectedChange,
  onSave,
  onHide,
  className,
}: {
  item: OpportunityItem;
  selected: boolean;
  onSelectedChange: (checked: boolean) => void;
  onSave?: (id: string) => void;
  onHide?: (id: string) => void;
  className?: string;
}) {
  const rating = item.company.rating ?? 0;

  return (
    <Card className={cn("rounded-2xl border shadow-none hover:shadow-sm transition-all", className)}>
      <CardContent className="p-4 md:p-5">
        <div className="grid grid-cols-[auto,1fr,auto] items-start gap-3 md:gap-4">
          {/* Checkbox */}
          <div className="pt-1">
            <Checkbox checked={selected} onCheckedChange={(v) => onSelectedChange(Boolean(v))} aria-label="Select job" />
          </div>

          {/* Main content */}
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug md:text-base line-clamp-1">{item.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="relative h-4 w-4 overflow-hidden rounded">
                      <Image src={item.company.logo || "/placeholder-logo.jpg"} alt={item.company.name} fill className="object-cover" />
                    </div>
                    <span className="font-medium text-foreground/90">{item.company.name}</span>
                    {rating > 0 && (
                      <span className="ml-1 inline-flex items-center gap-0.5 text-[11px]">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  {item.experience && (
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{item.experience}</span>
                  )}
                  {item.salary && (
                    <span className="inline-flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{item.salary}</span>
                  )}
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{item.location}</span>
                </div>
              </div>
            </div>

            {/* Meta description */}
            {item.description && (
              <p className="mt-2 line-clamp-2 text-xs md:text-sm text-muted-foreground">{item.description}</p>
            )}

            {/* Skills */}
            {item.skills && item.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.skills.slice(0, 6).map((s) => (
                  <Badge key={s} variant="outline" className="text-[11px]">{s}</Badge>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{item.postedAgo || "1 Day ago"}</span>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => onHide?.(item.id)}>
                  <EyeOff className="h-3.5 w-3.5" /> Hide
                </button>
                <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => onSave?.(item.id)}>
                  <Bookmark className="h-3.5 w-3.5" /> Save
                </button>
              </div>
            </div>
          </div>

          {/* Right logo */}
          <div className="hidden md:block pt-1">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
              <Image src={item.company.logo || "/placeholder-logo.jpg"} alt={item.company.name} fill className="object-cover" />
            </div>
          </div>
        </div>
      </CardContent>
      {item.promoted && (
        <div className="border-t px-4 py-2 text-[11px] text-muted-foreground">Matching jobs promoted by companies</div>
      )}
    </Card>
  );
}


