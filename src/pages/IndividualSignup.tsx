import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IndividualSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    city: "",
    state: "",
    vehicle_type: "",
    has_solar: false,
    monthly_electricity: "",
  });

  const states = ["Karnataka", "Maharashtra", "Tamil Nadu", "Delhi", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Kerala", "Punjab"];

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.full_name || !formData.phone || !formData.city || !formData.state) {
        toast({ title: "Please fill all required fields", variant: "destructive" });
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.full_name,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.full_name,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          user_type: "individual",
          vehicle_type: formData.vehicle_type,
          has_solar: formData.has_solar,
          monthly_electricity: parseInt(formData.monthly_electricity) || 0,
        });

        if (profileError) throw profileError;

        toast({ title: "Account created successfully! Welcome to EcoVerse." });
        navigate("/dashboard/individual");
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={() => step === 1 ? navigate("/auth") : setStep(step - 1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 ? "Basic Information" : "Quick Profile Setup"}
              </CardTitle>
              <div className="flex gap-2 mt-4">
                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'} transition-all`} />
                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'} transition-all`} />
                <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'} transition-all`} />
              </div>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleChange("full_name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Create a strong password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="vehicle">Vehicle Type</Label>
                    <Select value={formData.vehicle_type} onValueChange={(value) => handleChange("vehicle_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EV">Electric Vehicle</SelectItem>
                        <SelectItem value="Public Transport">Public Transport</SelectItem>
                        <SelectItem value="Petrol/Diesel">Petrol/Diesel</SelectItem>
                        <SelectItem value="Bicycle">Bicycle</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="solar"
                      checked={formData.has_solar}
                      onCheckedChange={(checked) => handleChange("has_solar", checked)}
                    />
                    <Label htmlFor="solar" className="cursor-pointer">
                      I have solar panels installed at home
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="electricity">Monthly Electricity Usage (units)</Label>
                    <Input
                      id="electricity"
                      type="number"
                      value={formData.monthly_electricity}
                      onChange={(e) => handleChange("monthly_electricity", e.target.value)}
                      placeholder="e.g., 200"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-semibold text-lg mb-4">Permissions & Consent</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="geo" />
                      <Label htmlFor="geo" className="cursor-pointer text-sm">
                        Allow location access for action verification (e.g., smart dustbin scanning, tree planting)
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="camera" />
                      <Label htmlFor="camera" className="cursor-pointer text-sm">
                        Allow camera access for photo proof uploads (tree planting, recycling)
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="cursor-pointer text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {step < 3 ? (
                  <Button className="w-full" onClick={handleNext}>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleSignup} disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndividualSignup;
