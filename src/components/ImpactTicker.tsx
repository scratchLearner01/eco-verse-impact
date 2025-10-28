import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Recycle, TreeDeciduous, Wind } from "lucide-react";

interface Stats {
  recycled_plastics_kg: number;
  trees_planted: number;
  co2_saved_kg: number;
}

export const ImpactTicker = () => {
  const [stats, setStats] = useState<Stats>({
    recycled_plastics_kg: 0,
    trees_planted: 0,
    co2_saved_kg: 0,
  });
  const [displayStats, setDisplayStats] = useState<Stats>({
    recycled_plastics_kg: 0,
    trees_planted: 0,
    co2_saved_kg: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from("national_stats")
      .select("*")
      .order("week_start", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      setStats(data);
      animateNumbers(data);
    }
  };

  const animateNumbers = (targetStats: Stats) => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setDisplayStats({
        recycled_plastics_kg: Math.floor(targetStats.recycled_plastics_kg * progress),
        trees_planted: Math.floor(targetStats.trees_planted * progress),
        co2_saved_kg: Math.floor(targetStats.co2_saved_kg * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayStats(targetStats);
      }
    }, stepDuration);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-y py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <Recycle className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Week</p>
              <p className="text-3xl font-bold text-primary">{formatNumber(displayStats.recycled_plastics_kg)}</p>
              <p className="text-sm font-medium">kg Plastics Recycled</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
              <TreeDeciduous className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Week</p>
              <p className="text-3xl font-bold text-secondary">{formatNumber(displayStats.trees_planted)}</p>
              <p className="text-sm font-medium">Trees Planted</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
              <Wind className="w-7 h-7 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Week</p>
              <p className="text-3xl font-bold text-accent">{formatNumber(displayStats.co2_saved_kg)}</p>
              <p className="text-sm font-medium">kg CO₂ Saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
