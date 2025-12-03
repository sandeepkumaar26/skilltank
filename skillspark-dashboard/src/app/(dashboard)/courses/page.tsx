"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, CheckCircle2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";

// Mock course data matching the design
const mockAvailableCourses = [
  {
    id: "1",
    title: "Web Development",
    description: "A web development course teaches the essential skills for creating, building, and maintaining websites and web applications",
    category: "WEB DEVELOPMENT",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: true,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "2",
    title: "Data Science",
    description: "Analyze data, build predictive models, and visualize insights using Python and ML tools. Learn end-to-end data workflows used in real projects",
    category: "DATA SCIENCE",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: true,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "3",
    title: "Artificial Intelligence",
    description: "Learn neural networks, deep learning, and intelligent system design. Build AI models that solve complex problems",
    category: "ARTIFICIAL INTELLIGENCE",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: true,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "4",
    title: "Human Resource",
    description: "Understand recruitment, payroll, employee engagement, and HR operations. Develop practical skills needed in modern workplace management",
    category: "HUMAN RESOURCE",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: false,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "5",
    title: "Business Analytics",
    description: "Gain skills in data analysis, dashboard creation, and business decision-making. Learn how to turn raw data into actionable insights",
    category: "BUSINESS ANALYTICS",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: false,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "6",
    title: "UI/UX",
    description: "Learn to design user-friendly experiences through research, testing, and usability principles. Focus on how users interact with digital products",
    category: "UI/UX",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: false,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "7",
    title: "Digital Marketing",
    description: "Master online marketing tools, SEO, social media strategy, and ad campaigns. Build brand visibility and drive digital growth",
    category: "DIGITAL MARKETING",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: false,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "8",
    title: "Web Development",
    description: "A web development course teaches the essential skills for creating, building, and maintaining websites and web applications",
    category: "WEB DEVELOPMENT",
    duration: "1 month",
    type: "Full-Stack / Frontend / Backend",
    isPopular: false,
    gradient: "from-purple-500 to-purple-600",
  },
];

// All categories use the same purple gradient
const categoryGradient = "from-purple-500 to-purple-600";

// Extract unique categories with stats
const getCategoryStats = (category: string) => {
  if (category === "All") {
    const total = mockAvailableCourses.length;
    const completed = Math.floor(total * 0.4); // Mock: 40% completed
    return { total, completed };
  }
  const coursesInCategory = mockAvailableCourses.filter(c => c.category === category);
  const total = coursesInCategory.length;
  const completed = Math.floor(total * Math.random() * 0.6); // Mock: random completion
  return { total, completed };
};

const categories = ["All", ...Array.from(new Set(mockAvailableCourses.map(course => course.category)))];

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const animationRef = React.useRef<gsap.core.Tween | null>(null);

  const filteredAvailableCourses = mockAvailableCourses.filter((course) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = q === "" ||
      course.title.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q);
    
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Duplicate courses for seamless infinite scroll
  const duplicatedCourses = [...filteredAvailableCourses, ...filteredAvailableCourses, ...filteredAvailableCourses];

  // GSAP Auto-scroll effect
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate the width of one set of courses
    const courseCount = filteredAvailableCourses.length;
    const singleSetWidth = (320 + 24) * courseCount; // card width + gap

    // Create GSAP animation
    animationRef.current = gsap.to(scrollContainer, {
      scrollLeft: singleSetWidth,
      duration: courseCount * 3, // Adjust duration for speed
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Reset to start for seamless loop
        gsap.set(scrollContainer, { scrollLeft: 0 });
      },
    });

    // If already paused, pause the new animation
    if (isPaused) {
      animationRef.current.pause();
    }

    return () => {
      animationRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isPaused]);

  // Handle pause/resume on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  // Handle individual card hover
  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Manual scroll functions
  const scrollLeft = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 320 + 24; // card width + gap
    const currentScroll = scrollContainer.scrollLeft;
    const targetScroll = currentScroll - cardWidth * 2; // Scroll 2 cards at a time

    gsap.to(scrollContainer, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const scrollRight = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 320 + 24; // card width + gap
    const currentScroll = scrollContainer.scrollLeft;
    const targetScroll = currentScroll + cardWidth * 2; // Scroll 2 cards at a time

    gsap.to(scrollContainer, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Handle category card hover
  const handleCategoryMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCategoryMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Recommended Courses</h1>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for anything"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left scroll button - positioned outside the card area */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Right scroll button - positioned outside the card area */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
          onClick={scrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-hidden pt-6 pb-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedCourses.map((course, index) => (
            <Card 
              key={`${course.id}-${index}`}
              className="flex-shrink-0 w-[320px] overflow-visible hover:shadow-2xl transition-shadow cursor-pointer border-2"
              onClick={() => router.push(`/courses/${course.id}`)}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className={`bg-gradient-to-br ${course.gradient} p-6 relative`}>
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-black/20 text-white hover:bg-black/30 text-xs px-2 py-1">
                    {course.category}
                  </Badge>
                  {course.isPopular && (
                    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 text-xs px-2 py-1 flex items-center gap-1">
                      <span className="text-lg">👑</span> Popular
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-5 bg-gray-900 text-white space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-300 leading-relaxed min-h-[60px]">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    <span>{course.type}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/courses/${course.id}`);
                  }}
                >
                  View details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Tabs - 2 per row */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Browse by Domain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const stats = getCategoryStats(category);
            const isSelected = selectedCategory === category;
            
            return (
              <div
                key={category}
                className={`cursor-pointer transition-all hover:shadow-xl overflow-visible rounded-lg ${
                  isSelected ? "ring-2 ring-purple-600 ring-offset-2" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  router.push(`/courses/category/${encodeURIComponent(category)}`);
                }}
                onMouseEnter={handleCategoryMouseEnter}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <div className={`bg-gradient-to-r ${categoryGradient} p-5 rounded-lg`}>
                  <h3 className="font-semibold text-lg text-white mb-2">
                    {category}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white/90">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{stats.total} courses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{stats.completed} completed</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}