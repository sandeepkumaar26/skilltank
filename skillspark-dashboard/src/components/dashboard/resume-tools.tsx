"use client";

import * as React from "react";
import { Upload, CheckCircle, XCircle, AlertCircle, Download, ExternalLink, Brain, Scan, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface ResumeTool {
  id: string;
  name: string;
  description: string;
  type: 'upload' | 'form' | 'integration';
  icon: React.ComponentType<{ className?: string }>;
}

export interface AnalysisResult {
  score: number;
  status: 'pass' | 'fail' | 'warning';
  feedback: string[];
  suggestions: string[];
}

export interface ResumeToolsProps {
  tools: ResumeTool[];
  onAnalyze: (tool: string, data: any) => Promise<AnalysisResult>;
  className?: string;
}

const mockTools: ResumeTool[] = [
  {
    id: 'ats-scanner',
    name: 'ATS Scanner',
    description: 'Check if your resume passes Applicant Tracking Systems',
    type: 'upload',
    icon: Scan,
  },
  {
    id: 'linkedin-score',
    name: 'LinkedIn Profile Score',
    description: 'Analyze your LinkedIn profile for optimization opportunities',
    type: 'integration',
    icon: Linkedin,
  },
  {
    id: 'ai-optimizer',
    name: 'AI Resume Optimizer',
    description: 'Get AI-powered suggestions to improve your resume content',
    type: 'form',
    icon: Brain,
  },
];

function ATSScanner({ onAnalyze }: { onAnalyze: (data: any) => Promise<AnalysisResult> }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    try {
      const mockResult = await onAnalyze({ file });
      setResult(mockResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="resume-upload">Upload Resume (PDF, DOC, DOCX)</Label>
        <Input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        {file && (
          <p className="text-sm text-muted-foreground">
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      <Button 
        onClick={handleAnalyze} 
        disabled={!file || isAnalyzing}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Scan className="h-4 w-4 mr-2" />
            Scan Resume
          </>
        )}
      </Button>

      {result && (
        <Card className={cn(
          "mt-4",
          result.status === 'pass' && "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
          result.status === 'warning' && "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
          result.status === 'fail' && "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              {result.status === 'pass' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {result.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
              {result.status === 'fail' && <XCircle className="h-5 w-5 text-red-600" />}
              <CardTitle className="text-lg">
                ATS Compatibility: {result.score}%
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={result.score} className="h-2" />
            
            {result.feedback.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Analysis Results:</h4>
                <ul className="space-y-1">
                  {result.feedback.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.suggestions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Improvement Suggestions:</h4>
                <ul className="space-y-1">
                  {result.suggestions.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function LinkedInScore({ onAnalyze }: { onAnalyze: (data: any) => Promise<AnalysisResult> }) {
  const [profileUrl, setProfileUrl] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!profileUrl) return;
    
    setIsAnalyzing(true);
    try {
      const mockResult = await onAnalyze({ profileUrl });
      setResult(mockResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
        <Input
          id="linkedin-url"
          type="url"
          placeholder="https://linkedin.com/in/your-profile"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
        />
      </div>

      <Button 
        onClick={handleAnalyze} 
        disabled={!profileUrl || isAnalyzing}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Linkedin className="h-4 w-4 mr-2" />
            Analyze Profile
          </>
        )}
      </Button>

      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-600" />
              LinkedIn Score: {result.score}%
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-32 w-32 mx-auto">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - result.score / 100)}`}
                  className="text-blue-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{result.score}%</span>
              </div>
            </div>
            
            {result.suggestions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Optimization Tips:</h4>
                <ul className="space-y-1">
                  {result.suggestions.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AIOptimizer({ onAnalyze }: { onAnalyze: (data: any) => Promise<AnalysisResult> }) {
  const [jobTitle, setJobTitle] = React.useState('');
  const [jobDescription, setJobDescription] = React.useState('');
  const [currentResume, setCurrentResume] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!jobTitle || !jobDescription || !currentResume) return;
    
    setIsAnalyzing(true);
    try {
      const mockResult = await onAnalyze({ jobTitle, jobDescription, currentResume });
      setResult(mockResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="job-title">Target Job Title</Label>
        <Input
          id="job-title"
          placeholder="e.g., Senior Frontend Developer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="job-description">Job Description</Label>
        <Textarea
          id="job-description"
          placeholder="Paste the job description here..."
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="current-resume">Current Resume Summary</Label>
        <Textarea
          id="current-resume"
          placeholder="Paste your current resume summary or key sections..."
          rows={4}
          value={currentResume}
          onChange={(e) => setCurrentResume(e.target.value)}
        />
      </div>

      <Button 
        onClick={handleAnalyze} 
        disabled={!jobTitle || !jobDescription || !currentResume || isAnalyzing}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
            Generating Suggestions...
          </>
        ) : (
          <>
            <Brain className="h-4 w-4 mr-2" />
            Optimize Resume
          </>
        )}
      </Button>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Optimization Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={result.status === 'pass' ? 'default' : 'secondary'}>
                Match Score: {result.score}%
              </Badge>
            </div>
            
            {result.suggestions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">AI Recommendations:</h4>
                <div className="space-y-3">
                  {result.suggestions.map((item, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function ResumeTools({ className }: { className?: string }) {
  const handleAnalyze = async (tool: string, data: any): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results based on tool type
    switch (tool) {
      case 'ats-scanner':
        return {
          score: 78,
          status: 'warning',
          feedback: [
            "Resume successfully parsed by ATS",
            "Contact information clearly visible",
            "Good use of standard section headers",
            "Some keywords may be missing"
          ],
          suggestions: [
            "Add more industry-specific keywords",
            "Use standard font (Arial, Calibri, or Times New Roman)",
            "Include a skills section with relevant technologies",
            "Quantify achievements with specific numbers"
          ]
        };

      case 'linkedin-score':
        return {
          score: 85,
          status: 'pass',
          feedback: [],
          suggestions: [
            "Add more skills endorsements",
            "Get more recommendations from colleagues",
            "Update your headline to be more specific",
            "Add recent work samples to your profile",
            "Write articles to show thought leadership"
          ]
        };

      case 'ai-optimizer':
        return {
          score: 72,
          status: 'warning',
          feedback: [],
          suggestions: [
            "Tailor your professional summary to match the job requirements",
            "Emphasize experience with React, TypeScript, and Node.js",
            "Add metrics: 'Led team of 5 developers' → 'Led team of 5 developers, delivering 15+ features'",
            "Include keywords like 'agile methodology', 'CI/CD', and 'code review'",
            "Highlight your leadership and mentoring experience",
            "Mention specific technologies mentioned in the job posting"
          ]
        };

      default:
        return {
          score: 0,
          status: 'fail',
          feedback: [],
          suggestions: []
        };
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Resume Optimization Tools</h2>
        <p className="text-muted-foreground">
          Improve your resume and profile with our AI-powered analysis tools
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="ats-scanner" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Scan className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">ATS Scanner</h3>
                <p className="text-sm text-muted-foreground">
                  Check if your resume passes Applicant Tracking Systems
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <ATSScanner onAnalyze={(data) => handleAnalyze('ats-scanner', data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="linkedin-score" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">LinkedIn Profile Score</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze your LinkedIn profile for optimization opportunities
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <LinkedInScore onAnalyze={(data) => handleAnalyze('linkedin-score', data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ai-optimizer" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">AI Resume Optimizer</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered suggestions to improve your resume content
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <AIOptimizer onAnalyze={(data) => handleAnalyze('ai-optimizer', data)} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}