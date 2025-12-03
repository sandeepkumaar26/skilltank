import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Users, Briefcase, TrendingUp, Star, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Rocket className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold">SkillSpark Startup</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Dashboard
          </Link>
          <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Find Top Talent for Your
            <span className="text-blue-600"> Growing Startup</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with skilled interns and entry-level professionals ready to help your startup grow. Post internships, manage applications, and build your dream team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                <Rocket className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border">
            <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Access Top Talent</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with pre-vetted candidates from top universities and bootcamps ready to contribute to your startup.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border">
            <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Hiring</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Post internships in minutes, manage applications efficiently, and streamline your hiring process.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border">
            <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Grow Your Team</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Scale your workforce with flexible hiring options and find the right talent at every stage of growth.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-blue-600 dark:bg-blue-700 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Growing Startups</h2>
            <p className="text-blue-100">Join hundreds of companies finding their next team members</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active Startups</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Talented Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2K+</div>
              <div className="text-blue-100">Successful Hires</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-blue-100 flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                Average Rating
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your team?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start posting internships and finding great talent today
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              <Building2 className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-32 border-t">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 SkillSpark Startup. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
