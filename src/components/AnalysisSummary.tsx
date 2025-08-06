import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Star,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisSummaryProps {
  resumeScore: number;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

const AnalysisSummary = ({
  resumeScore,
  matchPercentage,
  matchingSkills,
  missingSkills,
  strengths,
  improvements,
  recommendations
}: AnalysisSummaryProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Resume Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={cn("text-3xl font-bold mb-1", getScoreColor(resumeScore))}>
                {resumeScore}/100
              </div>
              <Progress value={resumeScore} className="mb-2" />
              <p className="text-xs text-gray-500">
                {resumeScore >= 80 ? "Excellent" : resumeScore >= 60 ? "Good" : "Needs Work"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Job Match</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={cn("text-3xl font-bold mb-1", getMatchColor(matchPercentage))}>
                {matchPercentage}%
              </div>
              <Progress value={matchPercentage} className="mb-2" />
              <p className="text-xs text-gray-500">
                {matchPercentage >= 80 ? "Perfect Match" : matchPercentage >= 60 ? "Good Match" : "Poor Match"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Skills Match</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-blue-600">
                {matchingSkills.length}/{matchingSkills.length + missingSkills.length}
              </div>
              <p className="text-xs text-gray-500">
                Skills Covered
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-green-600" />
              Top Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {strengths.slice(0, 3).map((strength, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-gray-700">{strength}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Critical Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {improvements.slice(0, 3).map((improvement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-red-600" />
                  <p className="text-xs text-gray-700">{improvement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Priority Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisSummary; 