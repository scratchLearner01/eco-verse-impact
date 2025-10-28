import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ImpactTicker } from "@/components/ImpactTicker";
import { StateRankings } from "@/components/StateRankings";
import { supabase } from "@/integrations/supabase/client";
import { Recycle, Users, Zap } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) setUser(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-12 pb-4">
          <HeroCarousel />
        </section>

        {/* Impact Ticker */}
        <ImpactTicker />

        {/* How It Works */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                <Users className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Join</h3>
              <p className="text-muted-foreground">Sign up as an individual or industry to start tracking your environmental impact</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                <Recycle className="w-12 h-12 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Act</h3>
              <p className="text-muted-foreground">Take eco-friendly actions like recycling, planting trees, using public transport</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                <Zap className="w-12 h-12 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Earn</h3>
              <p className="text-muted-foreground">Earn EcoPoints, unlock badges, and industries can get tax benefits</p>
            </div>
          </div>
        </section>

        {/* State Rankings */}
        <StateRankings />

        {/* Footer */}
        <footer className="bg-muted mt-16 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">EcoVerse</h3>
                <p className="text-sm text-muted-foreground">
                  India's gamified environmental impact platform. Track, verify, and earn rewards for sustainable actions.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Partners</h3>
                <p className="text-sm text-muted-foreground">Smart City Mission</p>
                <p className="text-sm text-muted-foreground">Ministry of Environment</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Data Sources</h3>
                <p className="text-sm text-muted-foreground">TERI (The Energy and Resources Institute)</p>
                <p className="text-sm text-muted-foreground">CPCB (Central Pollution Control Board)</p>
                <p className="text-sm text-muted-foreground">Global Carbon Project</p>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2024 EcoVerse. All environmental data is indicative and sourced from government agencies.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
