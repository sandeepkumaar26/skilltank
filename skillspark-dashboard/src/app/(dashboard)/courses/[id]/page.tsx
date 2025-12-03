"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, User2, Clock, Star, Download, MessageSquare } from "lucide-react";

const mockCourses: Record<string, any> = {
  "1": {
    id: "1",
    title: "Web Development",
    banner: "/placeholder-course.jpg",
    instructor: "John Smith",
    level: "intermediate",
    rating: 4.8,
    price: 2999,
    duration: "1 month",
    category: "WEB DEVELOPMENT",
    description: "A web development course teaches the essential skills for creating, building, and maintaining websites and web applications",
    syllabus: [
      { week: 1, title: "HTML & CSS Fundamentals", topics: ["HTML5", "CSS3", "Responsive Design"] },
      { week: 2, title: "JavaScript Basics", topics: ["ES6+", "DOM Manipulation", "Async Programming"] },
      { week: 3, title: "Frontend Frameworks", topics: ["React", "State Management", "Component Design"] },
      { week: 4, title: "Backend Development", topics: ["Node.js", "Express", "REST APIs"] },
    ],
  },
  "2": {
    id: "2",
    title: "Data Science",
    banner: "/placeholder-course.jpg",
    instructor: "Dr. Sarah Johnson",
    level: "intermediate",
    rating: 4.9,
    price: 3499,
    duration: "1 month",
    category: "DATA SCIENCE",
    description: "Analyze data, build predictive models, and visualize insights using Python and ML tools. Learn end-to-end data workflows used in real projects",
    syllabus: [
      { week: 1, title: "Python for Data Science", topics: ["NumPy", "Pandas", "Data Cleaning"] },
      { week: 2, title: "Data Visualization", topics: ["Matplotlib", "Seaborn", "Plotly"] },
      { week: 3, title: "Machine Learning", topics: ["Scikit-learn", "Regression", "Classification"] },
      { week: 4, title: "Advanced Topics", topics: ["Deep Learning", "Neural Networks", "Model Deployment"] },
    ],
  },
  "3": {
    id: "3",
    title: "Artificial Intelligence",
    banner: "/placeholder-course.jpg",
    instructor: "Prof. Michael Chen",
    level: "advanced",
    rating: 4.7,
    price: 4999,
    duration: "1 month",
    category: "ARTIFICIAL INTELLIGENCE",
    description: "Learn neural networks, deep learning, and intelligent system design. Build AI models that solve complex problems",
    syllabus: [
      { week: 1, title: "AI Fundamentals", topics: ["Machine Learning Basics", "Neural Networks", "Deep Learning"] },
      { week: 2, title: "Computer Vision", topics: ["CNNs", "Image Processing", "Object Detection"] },
      { week: 3, title: "Natural Language Processing", topics: ["Transformers", "BERT", "GPT Models"] },
      { week: 4, title: "AI Applications", topics: ["Reinforcement Learning", "GANs", "AI Ethics"] },
    ],
  },
  "4": {
    id: "4",
    title: "Human Resource",
    banner: "/placeholder-course.jpg",
    instructor: "Emily Davis",
    level: "beginner",
    rating: 4.6,
    price: 2499,
    duration: "1 month",
    category: "HUMAN RESOURCE",
    description: "Understand recruitment, payroll, employee engagement, and HR operations. Develop practical skills needed in modern workplace management",
    syllabus: [
      { week: 1, title: "HR Fundamentals", topics: ["Recruitment", "Onboarding", "HR Policies"] },
      { week: 2, title: "Employee Relations", topics: ["Performance Management", "Conflict Resolution", "Employee Engagement"] },
      { week: 3, title: "Compensation & Benefits", topics: ["Payroll", "Benefits Administration", "Compensation Planning"] },
      { week: 4, title: "HR Analytics", topics: ["HR Metrics", "Data-Driven Decisions", "Workforce Planning"] },
    ],
  },
  "5": {
    id: "5",
    title: "Business Analytics",
    banner: "/placeholder-course.jpg",
    instructor: "David Wilson",
    level: "intermediate",
    rating: 4.5,
    price: 2999,
    duration: "1 month",
    category: "BUSINESS ANALYTICS",
    description: "Gain skills in data analysis, dashboard creation, and business decision-making. Learn how to turn raw data into actionable insights",
    syllabus: [
      { week: 1, title: "Business Intelligence Basics", topics: ["Data Analysis", "Excel Advanced", "SQL"] },
      { week: 2, title: "Data Visualization", topics: ["Tableau", "Power BI", "Dashboard Design"] },
      { week: 3, title: "Statistical Analysis", topics: ["Descriptive Statistics", "Hypothesis Testing", "Regression"] },
      { week: 4, title: "Business Strategy", topics: ["KPIs", "Business Metrics", "Strategic Planning"] },
    ],
  },
  "6": {
    id: "6",
    title: "UI/UX Design",
    banner: "/placeholder-course.jpg",
    instructor: "Alex Rodriguez",
    level: "beginner",
    rating: 4.8,
    price: 2799,
    duration: "1 month",
    category: "UI/UX",
    description: "Learn to design user-friendly experiences through research, testing, and usability principles. Focus on how users interact with digital products",
    syllabus: [
      { week: 1, title: "Design Fundamentals", topics: ["Design Principles", "Color Theory", "Typography"] },
      { week: 2, title: "User Research", topics: ["User Interviews", "Personas", "User Journey Maps"] },
      { week: 3, title: "UI Design", topics: ["Figma", "Wireframing", "Prototyping"] },
      { week: 4, title: "UX Testing", topics: ["Usability Testing", "A/B Testing", "Design Iteration"] },
    ],
  },
  "7": {
    id: "7",
    title: "Digital Marketing",
    banner: "/placeholder-course.jpg",
    instructor: "Maria Garcia",
    level: "beginner",
    rating: 4.7,
    price: 2499,
    duration: "1 month",
    category: "DIGITAL MARKETING",
    description: "Master online marketing tools, SEO, social media strategy, and ad campaigns. Build brand visibility and drive digital growth",
    syllabus: [
      { week: 1, title: "Marketing Fundamentals", topics: ["Marketing Strategy", "Target Audience", "Brand Positioning"] },
      { week: 2, title: "SEO & Content", topics: ["Search Engine Optimization", "Content Marketing", "Keyword Research"] },
      { week: 3, title: "Social Media Marketing", topics: ["Facebook Ads", "Instagram Marketing", "LinkedIn Strategy"] },
      { week: 4, title: "Analytics & ROI", topics: ["Google Analytics", "Campaign Tracking", "Performance Metrics"] },
    ],
  },
  "8": {
    id: "8",
    title: "Web Development",
    banner: "/placeholder-course.jpg",
    instructor: "Robert Brown",
    level: "intermediate",
    rating: 4.8,
    price: 2999,
    duration: "1 month",
    category: "WEB DEVELOPMENT",
    description: "A web development course teaches the essential skills for creating, building, and maintaining websites and web applications",
    syllabus: [
      { week: 1, title: "HTML & CSS Fundamentals", topics: ["HTML5", "CSS3", "Responsive Design"] },
      { week: 2, title: "JavaScript Basics", topics: ["ES6+", "DOM Manipulation", "Async Programming"] },
      { week: 3, title: "Frontend Frameworks", topics: ["React", "State Management", "Component Design"] },
      { week: 4, title: "Backend Development", topics: ["Node.js", "Express", "REST APIs"] },
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const course = mockCourses[id];
  if (!course) return notFound();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative h-56 w-full overflow-hidden rounded-xl border">
        <Image src={course.banner} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1"><User2 className="h-4 w-4" /> {course.instructor}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {course.rating}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button className="gap-2"><Play className="h-4 w-4" /> Enroll</Button>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Syllabus PDF</Button>
        <Badge variant="secondary">{course.level}</Badge>
        <div className="ml-auto text-right">
          <div className="text-xs text-muted-foreground">Price</div>
          <div className="text-xl font-bold">₹{course.price.toLocaleString()}</div>
        </div>
      </div>

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about" className="gap-2"><BookOpen className="h-4 w-4" /> About</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="discussion" className="gap-2"><MessageSquare className="h-4 w-4" /> Discussion</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold">About this course</h3>
              <p className="text-sm text-muted-foreground">{course.description}</p>
              <h3 className="font-semibold mt-4">Instructor</h3>
              <p className="text-sm text-muted-foreground">{course.instructor} is a seasoned professional who has taught thousands of learners.</p>
              <h3 className="font-semibold mt-4">Course Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span> <span className="font-medium">{course.duration}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Level:</span> <span className="font-medium capitalize">{course.level}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span> <span className="font-medium">{course.category}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rating:</span> <span className="font-medium">{course.rating} ⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="syllabus">
          <div className="grid gap-3">
            {course.syllabus.map((w: any) => (
              <Card key={w.week}>
                <CardContent className="p-4">
                  <div className="font-medium">Week {w.week}: {w.title}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {w.topics.map((t: string) => (
                      <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="discussion">
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Coming soon: Q&A, notes, and community discussion.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


