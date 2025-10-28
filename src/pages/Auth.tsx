import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Factory } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type");
  const [showChoice, setShowChoice] = useState(!preselectedType);

  if (preselectedType && showChoice) {
    navigate(`/auth/${preselectedType}/signup`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Join EcoVerse</h1>
          <p className="text-center text-muted-foreground mb-12">
            Choose your account type to get started
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Individual Card */}
            <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-primary group">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Individual</CardTitle>
                <CardDescription className="text-base">
                  Track your personal environmental impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Earn EcoPoints for sustainable actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Unlock achievement badges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Compare with your city and state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Access to marketplace</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-4"
                  size="lg"
                  onClick={() => navigate("/auth/individual/signup")}
                >
                  Sign Up as Individual
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/auth/individual/login")}
                >
                  Already have an account? Login
                </Button>
              </CardContent>
            </Card>

            {/* Industry Card */}
            <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-secondary group">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Factory className="w-12 h-12 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Industry</CardTitle>
                <CardDescription className="text-base">
                  Manage corporate environmental compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Track emissions and compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Earn tax relief through EcoScore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Get government certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>AI-powered insights & reporting</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-4"
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/auth/industry/signup")}
                >
                  Sign Up as Industry
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/auth/industry/login")}
                >
                  Already have an account? Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
