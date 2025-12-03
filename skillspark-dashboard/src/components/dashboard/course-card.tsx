"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Clock, Users, Play, Award, Download, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  reviewCount?: number;
  instructor?: string;
  duration?: string;
  studentsCount?: number;
  price?: number;
  tags?: string[];
  
  // For enrolled courses
  progress?: number;
  isCompleted?: boolean;
  hasCertificate?: boolean;
  enrolledDate?: Date;
  
  onAction: (action: 'enroll' | 'continue' | 'certificate' | 'start') => void;
  className?: string;
}

const levelConfig = {
  beginner: { label: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
};

export function CourseCard({
  id,
  title,
  image,
  level,
  rating,
  reviewCount,
  instructor,
  duration,
  studentsCount,
  price,
  tags = [],
  progress,
  isCompleted = false,
  hasCertificate = false,
  enrolledDate,
  onAction,
  className,
}: CourseCardProps) {
  const isEnrolled = progress !== undefined;
  const levelInfo = levelConfig[level];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-muted text-muted-foreground"
        )}
      />
    ));
  };

  const getActionButton = () => {
    if (isCompleted && hasCertificate) {
      return (
        <Button 
          onClick={() => onAction('certificate')} 
          className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Certificate
        </Button>
      );
    }
    
    if (isEnrolled) {
      return (
        <Button 
          onClick={() => onAction('continue')} 
          className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Play className="h-4 w-4 mr-2" />
          {progress === 0 ? 'Start Course' : 'Continue Course'}
        </Button>
      );
    }
    
    return (
      <Button 
        onClick={() => onAction('enroll')} 
        className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
      >
        <BookOpen className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
        Enroll Now
      </Button>
    );
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20",
      className
    )}>
      <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {image && image !== "/placeholder-course.jpg" ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <Badge className={cn("shadow-md", levelInfo.color)}>
            {levelInfo.label}
          </Badge>
        </div>
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
              <Award className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </div>
        )}
        {!isEnrolled && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play className="h-5 w-5 text-primary" />
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {instructor && (
            <p className="text-sm text-muted-foreground font-medium">
              by <span className="text-foreground">{instructor}</span>
            </p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-bold text-amber-600">
            {rating.toFixed(1)}
          </span>
          {reviewCount && (
            <span className="text-sm text-muted-foreground">
              ({reviewCount.toLocaleString()} reviews)
            </span>
          )}
        </div>

        {/* Course Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          )}
          {studentsCount && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{studentsCount.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Progress (for enrolled courses) */}
        {isEnrolled && (
          <div className="space-y-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Progress</span>
              <span className="text-lg font-bold text-primary">{progress}%</span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20" 
                   style={{ width: `${progress}%` }} />
            </div>
            {enrolledDate && (
              <p className="text-xs text-muted-foreground">
                Enrolled on {enrolledDate.toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Price (for non-enrolled courses) */}
        {!isEnrolled && price !== undefined && (
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Price</span>
            {price === 0 ? (
              <span className="text-xl font-bold text-green-600">Free</span>
            ) : (
              <span className="text-xl font-bold text-primary">₹{price.toLocaleString()}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {getActionButton()}
      </CardFooter>
    </Card>
  );
}

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 w-4/5 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-4 w-4 bg-muted animate-pulse rounded" />
            ))}
          </div>
          <div className="h-4 w-8 bg-muted animate-pulse rounded" />
        </div>
        
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        </div>
        
        <div className="flex gap-1">
          <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-14 bg-muted animate-pulse rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
}