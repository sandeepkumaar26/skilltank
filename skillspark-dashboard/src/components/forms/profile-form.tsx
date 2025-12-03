"use client";

import * as React from "react";
import { Save, Plus, X, Github, Linkedin, Globe, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  linkedAccounts: LinkedAccount[];
  resumePublic: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface LinkedAccount {
  id: string;
  platform: 'github' | 'linkedin' | 'website';
  url: string;
  verified: boolean;
}

export interface ProfileFormProps {
  user: {
    profile: UserProfile;
    preferences: {
      notifications: any;
      privacy: any;
    };
  };
  onSave: (data: Partial<UserProfile>) => Promise<void>;
  onCancel?: () => void;
  className?: string;
}

export function ProfileForm({ user, onSave, onCancel, className }: ProfileFormProps) {
  const [formData, setFormData] = React.useState<UserProfile>(user.profile);
  const [isSaving, setIsSaving] = React.useState(false);
  const [newSkill, setNewSkill] = React.useState('');

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      description: '',
      startDate: '',
      current: false,
    };
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, value: any) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startYear: new Date().getFullYear(),
      current: false,
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: any) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      toast.success("Profile updated successfully", {
        description: "Your profile changes have been saved.",
      });
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error("Failed to save profile", {
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getAccountIcon = (platform: LinkedAccount['platform']) => {
    switch (platform) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'website': return Globe;
      default: return Globe;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar} alt="Profile" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills & Privacy */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Resume</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your resume visible to employers
                  </p>
                </div>
                <Switch
                  checked={formData.resumePublic}
                  onCheckedChange={(checked) => handleInputChange('resumePublic', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Linked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Linked Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.linkedAccounts.map((account) => {
                const Icon = getAccountIcon(account.platform);
                return (
                  <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium capitalize">{account.platform}</p>
                        <p className="text-sm text-muted-foreground">{account.url}</p>
                      </div>
                    </div>
                    <Badge variant={account.verified ? 'default' : 'secondary'}>
                      {account.verified ? 'Connected' : 'Pending'}
                    </Badge>
                  </div>
                );
              })}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Connect Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Experience</CardTitle>
            <Button onClick={handleAddExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExperience(exp.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => handleUpdateExperience(exp.id, 'position', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={exp.current}
                  onCheckedChange={(checked) => handleUpdateExperience(exp.id, 'current', checked)}
                />
                <Label>Currently working here</Label>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your role and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button onClick={handleAddEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEducation(edu.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => handleUpdateEducation(edu.id, 'field', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) => handleUpdateEducation(edu.id, 'startYear', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Input
                    type="number"
                    value={edu.endYear || ''}
                    onChange={(e) => handleUpdateEducation(edu.id, 'endYear', e.target.value ? parseInt(e.target.value) : undefined)}
                    disabled={edu.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={edu.current}
                  onCheckedChange={(checked) => handleUpdateEducation(edu.id, 'current', checked)}
                />
                <Label>Currently studying here</Label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}