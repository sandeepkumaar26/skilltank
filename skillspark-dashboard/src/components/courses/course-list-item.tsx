"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clock, Star, BookOpen, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

export type CourseList = {
  id: string;
  title: string;
  instructor?: string;
  rating: number;
  reviewCount?: number;
  duration?: string;
  level: "beginner" | "intermediate" | "advanced";
  price?: number; // 0 for free
  image?: string;
  tags?: string[];
  description?: string;
};

export function CourseListItem({
  course,
  selected,
  onSelectedChange,
  onEnroll,
  className,
}: {
  course: CourseList;
  selected: boolean;
  onSelectedChange: (checked: boolean) => void;
  onEnroll?: (id: string) => void;
  className?: string;
}) {
  const priceText =
    course.price === undefined
      ? undefined
      : course.price === 0
      ? "Free"
      : `₹${course.price.toLocaleString()}`;

  return (
    <Card className={cn("rounded-2xl border shadow-none hover:shadow-sm transition-all", className)}>
      <CardContent className="p-4 md:p-5">
        <div className="grid grid-cols-[auto,1fr,auto] items-start gap-3 md:gap-4">
          <div className="pt-1">
            <Checkbox
              checked={selected}
              onCheckedChange={(v) => onSelectedChange(Boolean(v))}
              aria-label="Select course"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold md:text-base line-clamp-1">{course.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {course.instructor && (
                    <span className="inline-flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.instructor}</span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    {course.rating.toFixed(1)}
                    {course.reviewCount && <span className="ml-1 text-[11px]">({course.reviewCount.toLocaleString()} reviews)</span>}
                  </span>
                  {course.duration && (
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                  )}
                  {priceText && (
                    <span className="inline-flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> {priceText}</span>
                  )}
                  <Badge variant="secondary" className="rounded-full">{course.level}</Badge>
                </div>
              </div>
            </div>

            {course.description && (
              <p className="mt-2 line-clamp-2 text-xs md:text-sm text-muted-foreground">{course.description}</p>
            )}
            {course.tags && course.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {course.tags.slice(0, 6).map((t) => (
                  <Badge key={t} variant="outline" className="text-[11px]">{t}</Badge>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-end">
              <Button size="sm" onClick={() => onEnroll?.(course.id)}>Enroll</Button>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="hidden md:block pt-1">
            <div className="relative h-14 w-20 overflow-hidden rounded-md bg-muted">
              <Image src={course.image || "/placeholder-course.jpg"} alt={course.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



