"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterPanel, opportunityFilters, type FilterValues } from "@/components/dashboard/filter-panel";
import { OpportunityListItem, type OpportunityItem } from "@/components/opportunities/opportunity-list-item";

// Mock data - in real app this would come from API
const mockInternships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: {
      name: "TechCorp",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["React", "TypeScript", "CSS"],
    location: "San Francisco, CA",
    type: "internship" as const,
    compensation: "₹25,000/month",
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Work on cutting-edge web applications using React and TypeScript. Join our dynamic team and gain hands-on experience in modern frontend development.",
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: {
      name: "DataCorp",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Python", "Machine Learning", "SQL"],
    location: "New York, NY",
    type: "internship" as const,
    compensation: "₹30,000/month",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Analyze large datasets and build machine learning models to drive business insights. Perfect opportunity for aspiring data scientists.",
  },
  {
    id: "3",
    title: "UX Design Intern",
    company: {
      name: "DesignStudio",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Figma", "User Research", "Prototyping"],
    location: "Austin, TX",
    type: "internship" as const,
    compensation: "₹22,000/month",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Create intuitive user experiences for mobile and web applications. Learn from experienced designers in a collaborative environment.",
  },
  {
    id: "4",
    title: "Backend Developer Intern",
    company: {
      name: "ServerTech",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Node.js", "Database", "API"],
    location: "Seattle, WA",
    type: "internship" as const,
    compensation: "₹28,000/month",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Build scalable backend systems and APIs. Work with cloud technologies and microservices architecture.",
  },
  {
    id: "5",
    title: "Product Management Intern",
    company: {
      name: "ProductCo",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Strategy", "Analytics", "Research"],
    location: "Boston, MA",
    type: "internship" as const,
    compensation: "₹35,000/month",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Drive product strategy and work cross-functionally with engineering and design teams. Learn product management best practices.",
  },
  {
    id: "6",
    title: "Digital Marketing Intern",
    company: {
      name: "MarketingPro",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["SEO", "Social Media", "Analytics"],
    location: "Los Angeles, CA",
    type: "internship" as const,
    compensation: "₹20,000/month",
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Execute digital marketing campaigns across multiple channels. Gain experience with SEO, social media, and content marketing.",
  },
];

export default function InternshipsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<FilterValues>({});
  const [filteredInternships, setFilteredInternships] = React.useState(mockInternships);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  // Filter internships based on search query and filters
  React.useEffect(() => {
    let filtered = mockInternships;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((internship) =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply other filters
    if (filterValues.domain) {
      // This would be more sophisticated in a real app
      const domainKeywords = {
        engineering: ['developer', 'engineer', 'frontend', 'backend'],
        design: ['design', 'ux', 'ui'],
        data: ['data', 'analytics', 'science'],
        product: ['product', 'management'],
        marketing: ['marketing', 'seo', 'social'],
      };
      
      const keywords = domainKeywords[filterValues.domain as keyof typeof domainKeywords] || [];
      filtered = filtered.filter((internship) =>
        keywords.some(keyword =>
          internship.title.toLowerCase().includes(keyword) ||
          internship.tags.some(tag => tag.toLowerCase().includes(keyword))
        )
      );
    }

    if (filterValues.remote) {
      filtered = filtered.filter((internship) => internship.isRemote);
    }

    if (filterValues.compensation) {
      const { min, max } = filterValues.compensation;
      filtered = filtered.filter((internship) => {
        const compensation = parseInt(internship.compensation.replace(/[^\d]/g, ''));
        return (!min || compensation >= min) && (!max || compensation <= max);
      });
    }

    if (filterValues.deadline) {
      const selectedDate = new Date(filterValues.deadline);
      filtered = filtered.filter((internship) => internship.deadline <= selectedDate);
    }

    setFilteredInternships(filtered);
  }, [searchQuery, filterValues]);

  const handleViewDetails = (id: string) => {
    router.push(`/internships/${id}`);
  };

  const handleResetFilters = () => {
    setFilterValues({});
  };

  return (
    <div className="space-y-6">
      {/* Header row similar to Naukri listing page */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Recommended internships for you</h1>
          <div className="mt-1 text-sm text-muted-foreground">You can select up to 5 internships to apply</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Apply</Button>
        </div>
      </div>

      {/* Top search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search internships"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* List column */}
        <div className="lg:col-span-8 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Profile ({filteredInternships.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredInternships.map((it) => (
                <OpportunityListItem
                  key={it.id}
                  item={{
                    id: it.id,
                    title: it.title,
                    company: { name: it.company.name, logo: it.company.logo, rating: 3.8, reviewsCount: 500 },
                    experience: "0-1 Yr",
                    salary: it.compensation,
                    location: it.location,
                    postedAgo: "1 Day ago",
                    description: it.description,
                    skills: it.tags,
                    promoted: false,
                  } as OpportunityItem}
                  selected={Boolean(selected[it.id])}
                  onSelectedChange={(v) => setSelected((s) => ({ ...s, [it.id]: v }))}
                  onSave={(id) => console.log("save", id)}
                  onHide={(id) => console.log("hide", id)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right preferences column */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Add preferences to get matching internships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                "Preferred role",
                "Preferred work location",
                "Preferred stipend/salary",
              ].map((label) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <Button size="sm" variant="outline">Add</Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Get hired by winning a challenge</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Participate in hiring challenges and stand out to recruiters.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}