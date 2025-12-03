"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterPanel, type FilterValues } from "@/components/dashboard/filter-panel";
import { OpportunityListItem, type OpportunityItem } from "@/components/opportunities/opportunity-list-item";

// Job-specific filter configuration (expanded domains including hardware/manufacturing)
const jobFilters = [
  {
    key: 'domain',
    type: 'select' as const,
    label: 'Domain',
    options: [
      { value: 'engineering', label: 'Software Engineering' },
      { value: 'hardware', label: 'Hardware / Embedded' },
      { value: 'electronics', label: 'Electronics / VLSI' },
      { value: 'mechanical', label: 'Mechanical' },
      { value: 'manufacturing', label: 'Manufacturing / Plant' },
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
    key: 'experience',
    type: 'select' as const,
    label: 'Experience Level',
    options: [
      { value: 'entry', label: 'Entry Level (0-2 years)' },
      { value: 'mid', label: 'Mid Level (2-5 years)' },
      { value: 'senior', label: 'Senior Level (5+ years)' },
    ],
  },
  {
    key: 'salary',
    type: 'range' as const,
    label: 'Salary (₹ LPA)',
    min: 0,
    max: 50,
  },
  {
    key: 'remote',
    type: 'toggle' as const,
    label: 'Remote Work',
  },
  {
    key: 'deadline',
    type: 'date' as const,
    label: 'Apply Before',
  },
];

// Mock job data (software + hardware/manufacturing domains)
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: {
      name: "TechGiant",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["React", "TypeScript", "Node.js", "Leadership"],
    location: "San Francisco, CA",
    type: "job" as const,
    compensation: "₹25-35 LPA",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Lead frontend development initiatives and mentor junior developers. Work on high-scale applications serving millions of users.",
  },
  {
    id: "7",
    title: "Embedded Systems Engineer",
    company: { name: "ChipMakers", logo: "/placeholder-logo.jpg" },
    tags: ["C", "C++", "RTOS", "Microcontrollers"],
    location: "Pune, India",
    type: "job" as const,
    compensation: "₹8-14 LPA",
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Design and develop embedded firmware for IoT devices and automotive ECUs.",
  },
  {
    id: "8",
    title: "VLSI Design Engineer",
    company: { name: "SiliconWorks", logo: "/placeholder-logo.jpg" },
    tags: ["Verilog", "SystemVerilog", "RTL", "UVM"],
    location: "Bengaluru, India",
    type: "job" as const,
    compensation: "₹12-22 LPA",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Work on RTL design and verification for high-speed SoCs.",
  },
  {
    id: "9",
    title: "Mechanical Design Engineer",
    company: { name: "AutoMech", logo: "/placeholder-logo.jpg" },
    tags: ["SolidWorks", "GD&T", "DFM", "Sheet Metal"],
    location: "Chennai, India",
    type: "job" as const,
    compensation: "₹6-12 LPA",
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Design automotive components and assemblies with a focus on manufacturability.",
  },
  {
    id: "10",
    title: "Production Engineer",
    company: { name: "PlantPro", logo: "/placeholder-logo.jpg" },
    tags: ["Lean", "Six Sigma", "Kaizen", "TPM"],
    location: "Ahmedabad, India",
    type: "job" as const,
    compensation: "₹5-10 LPA",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Monitor and optimize production lines, drive continuous improvement initiatives.",
  },
  {
    id: "2",
    title: "Data Scientist",
    company: {
      name: "AI Solutions",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Python", "Machine Learning", "Deep Learning", "AWS"],
    location: "Bangalore, India",
    type: "job" as const,
    compensation: "₹18-25 LPA",
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Build and deploy machine learning models at scale. Work with cutting-edge AI technologies and drive data-driven decisions.",
  },
  {
    id: "3",
    title: "Product Designer",
    company: {
      name: "DesignFirst",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Figma", "User Research", "Design Systems", "Prototyping"],
    location: "Mumbai, India",
    type: "job" as const,
    compensation: "₹15-22 LPA",
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Shape product experiences from concept to launch. Collaborate with cross-functional teams to deliver exceptional user experiences.",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: {
      name: "CloudTech",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    location: "Hyderabad, India",
    type: "job" as const,
    compensation: "₹20-28 LPA",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    isRemote: false,
    description: "Manage cloud infrastructure and deployment pipelines. Ensure high availability and scalability of production systems.",
  },
  {
    id: "5",
    title: "Product Manager",
    company: {
      name: "StartupUnicorn",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["Strategy", "Analytics", "Roadmapping", "Agile"],
    location: "Delhi, India",
    type: "job" as const,
    compensation: "₹22-30 LPA",
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Drive product strategy and execution for fast-growing fintech products. Work closely with engineering and design teams.",
  },
  {
    id: "6",
    title: "Full Stack Developer",
    company: {
      name: "WebSolutions",
      logo: "/placeholder-logo.jpg",
    },
    tags: ["React", "Node.js", "MongoDB", "Express"],
    location: "Pune, India",
    type: "job" as const,
    compensation: "₹12-18 LPA",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isRemote: true,
    description: "Develop end-to-end web applications using modern JavaScript technologies. Work on diverse projects across multiple industries.",
  },
];

export default function JobsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<FilterValues>({});
  const [filteredJobs, setFilteredJobs] = React.useState(mockJobs);

  // Filter jobs based on search query and filters
  React.useEffect(() => {
    let filtered = mockJobs;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply domain filter (software + hardware/manufacturing mappings)
    if (filterValues.domain) {
      const domainKeywords = {
        engineering: ['developer', 'engineer', 'frontend', 'backend', 'devops', 'full stack', 'software'],
        hardware: ['embedded', 'firmware', 'pcb', 'hardware', 'fpga', 'ecus', 'microcontroller'],
        electronics: ['vlsi', 'verification', 'rtl', 'verilog', 'systemverilog', 'asic', 'soc'],
        mechanical: ['mechanical', 'sheet metal', 'cad', 'solidworks', 'gd&t', 'machining'],
        manufacturing: ['production', 'plant', 'lean', 'six sigma', 'kaizen', 'tpm', 'quality'],
        design: ['design', 'ux', 'ui'],
        data: ['data', 'analytics', 'scientist'],
        product: ['product', 'manager'],
        marketing: ['marketing', 'seo', 'social'],
      };
      
      const keywords = domainKeywords[filterValues.domain as keyof typeof domainKeywords] || [];
      filtered = filtered.filter((job) =>
        keywords.some(keyword =>
          job.title.toLowerCase().includes(keyword) ||
          job.tags.some(tag => tag.toLowerCase().includes(keyword))
        )
      );
    }

    // Apply remote filter
    if (filterValues.remote) {
      filtered = filtered.filter((job) => job.isRemote);
    }

    // Apply salary filter
    if (filterValues.salary) {
      const { min, max } = filterValues.salary;
      filtered = filtered.filter((job) => {
        const salaryRange = job.compensation.match(/₹(\d+)-(\d+)/);
        if (salaryRange) {
          const minSalary = parseInt(salaryRange[1]);
          const maxSalary = parseInt(salaryRange[2]);
          return (!min || maxSalary >= min) && (!max || minSalary <= max);
        }
        return true;
      });
    }

    // Apply deadline filter
    if (filterValues.deadline) {
      const selectedDate = new Date(filterValues.deadline);
      filtered = filtered.filter((job) => job.deadline <= selectedDate);
    }

    setFilteredJobs(filtered);
  }, [searchQuery, filterValues]);

  const handleViewDetails = (id: string) => {
    router.push(`/jobs/${id}`);
  };

  const handleResetFilters = () => {
    setFilterValues({});
  };

  return (
    <div className="space-y-6">
      {/* Header and search */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Recommended jobs for you</h1>
          <div className="mt-1 text-sm text-muted-foreground">Find roles across software, hardware, electronics, mechanical and more</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Apply</Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search jobs"
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
              <CardTitle className="text-base">Profile ({filteredJobs.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredJobs.map((job) => (
                <OpportunityListItem
                  key={job.id}
                  item={{
                    id: job.id,
                    title: job.title,
                    company: { name: job.company.name, logo: job.company.logo, rating: 3.9, reviewsCount: 1000 },
                    experience: '0-5 Yrs',
                    salary: job.compensation,
                    location: job.location,
                    postedAgo: '1 Day ago',
                    description: job.description,
                    skills: job.tags,
                    promoted: false,
                  } as OpportunityItem}
                  selected={false}
                  onSelectedChange={() => {}}
                  onSave={() => {}}
                  onHide={() => {}}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Filters / preferences */}
        <div className="lg:col-span-4 space-y-4">
          <FilterPanel
            filters={jobFilters}
            values={filterValues}
            onChange={setFilterValues}
            onReset={handleResetFilters}
          />
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Add preferences to get matching jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {['Preferred job role', 'Preferred work location', 'Preferred salary'].map((l) => (
                <div key={l} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{l}</span>
                  <Button size="sm" variant="outline">Add</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}