import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Plus, 
  FileText, 
  Target, 
  Clock, 
  TrendingUp, 
  Download,
  Eye,
  Edit3,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Applications This Month", value: "12", change: "+3 from last month", icon: FileText },
    { label: "Interview Calls", value: "4", change: "+2 from last month", icon: TrendingUp },
    { label: "Response Rate", value: "33%", change: "+15% improvement", icon: Target },
    { label: "Avg. Application Time", value: "3 min", change: "90% faster", icon: Clock }
  ];

  const recentApplications = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Full-Stack Developer",
      appliedDate: "2024-01-15",
      status: "interview",
      salary: "$120k - $150k"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Lead React Developer",
      appliedDate: "2024-01-14",
      status: "pending",
      salary: "$100k - $130k"
    },
    {
      id: 3,
      company: "MegaCorp Inc",
      position: "Full-Stack Engineer",
      appliedDate: "2024-01-12",
      status: "rejected",
      salary: "$90k - $110k"
    },
    {
      id: 4,
      company: "InnovateLab",
      position: "Senior Software Engineer",
      appliedDate: "2024-01-10",
      status: "applied",
      salary: "$110k - $140k"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'interview': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'interview': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'applied': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <Badge className={`${variants[status]} capitalize`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground">
                Let's continue your job search journey
              </p>
            </div>
            
            <Button className="bg-gradient-primary hover:shadow-glow mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Applications
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Track your latest job applications and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div 
                        key={app.id} 
                        className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold">
                            {app.company.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{app.position}</h3>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Applied {new Date(app.appliedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{app.salary}</p>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(app.status)}
                              {getStatusBadge(app.status)}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="bg-gradient-card border-white/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Speed up your job search
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Application
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Update Resume
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set Job Alerts
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-white/20">
                <CardHeader>
                  <CardTitle>Free Plan Usage</CardTitle>
                  <CardDescription>
                    2 of 3 applications used this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      1 application remaining
                    </p>
                    <Button variant="outline" className="w-full">
                      Upgrade to Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Pro Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">
                    Applications with tailored cover letters have 40% higher response rates. 
                    Use our AI to craft personalized letters for each job!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;