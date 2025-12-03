"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, Calendar, CheckCircle2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";

// Mock course data
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

// Extract unique categories
const allCategories = ["All", ...Array.from(new Set(mockAvailableCourses.map(course => course.category)))];

export default function CategoryCoursesPage() {
  const router = useRouter();
  const params = useParams();
  const initialCategory = decodeURIComponent(params?.category as string || "All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState(initialCategory);

  // Filter courses by selected domain
  const categoryCourses = selectedDomain === "All" 
    ? mockAvailableCourses 
    : mockAvailableCourses.filter(c => c.category === selectedDomain);

  // Apply search filter
  const filteredCourses = categoryCourses.filter((course) => {
    const q = searchQuery.toLowerCase();
    return (
      q === "" ||
      course.title.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q)
    );
  });

  // Handle card hover
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

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/courses")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{initialCategory}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Domain Filter Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {allCategories.map((domain) => (
          <Button
            key={domain}
            variant={selectedDomain === domain ? "default" : "outline"}
            className={`rounded-full transition-all w-full ${
              selectedDomain === domain
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "hover:bg-purple-50"
            }`}
            onClick={() => setSelectedDomain(domain)}
          >
            {domain}
          </Button>
        ))}
      </div>

      {/* Static Grid of Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id}
            className="w-full overflow-visible hover:shadow-2xl transition-shadow cursor-pointer border-2"
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

      {/* No results message */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}
