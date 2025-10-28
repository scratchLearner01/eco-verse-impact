import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trophy, Award } from "lucide-react";

interface State {
  id: string;
  name: string;
  avg_eco_points: number;
  aqi: number;
  water_purity_index: number;
  trees_per_sqkm: number;
  population: number;
}

export const StateRankings = () => {
  const [states, setStates] = useState<State[]>([]);
  const [expandedState, setExpandedState] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<keyof State>("avg_eco_points");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const { data } = await supabase
      .from("states")
      .select("*")
      .order("avg_eco_points", { ascending: false });

    if (data) setStates(data);
  };

  const handleSort = (column: keyof State) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }

    const sorted = [...states].sort((a, b) => {
      const aVal = a[column] || 0;
      const bVal = b[column] || 0;
      return sortOrder === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
    });
    setStates(sorted);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Award className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-amber-700" />;
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center">State Environmental Rankings</h2>
      
      <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">State</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:bg-muted-foreground/10 transition-colors" onClick={() => handleSort("avg_eco_points")}>
                  <div className="flex items-center justify-end gap-2">
                    Avg Eco Points
                    {sortBy === "avg_eco_points" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-6 py-4 text-right cursor-pointer hover:bg-muted-foreground/10 transition-colors" onClick={() => handleSort("aqi")}>
                  <div className="flex items-center justify-end gap-2">
                    AQI
                    {sortBy === "aqi" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-6 py-4 text-right cursor-pointer hover:bg-muted-foreground/10 transition-colors" onClick={() => handleSort("water_purity_index")}>
                  <div className="flex items-center justify-end gap-2">
                    Water Purity
                    {sortBy === "water_purity_index" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-6 py-4 text-right cursor-pointer hover:bg-muted-foreground/10 transition-colors" onClick={() => handleSort("trees_per_sqkm")}>
                  <div className="flex items-center justify-end gap-2">
                    Trees/km²
                    {sortBy === "trees_per_sqkm" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {states.map((state, index) => (
                <tr
                  key={state.id}
                  className="border-t hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedState(expandedState === state.id ? null : state.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(index)}
                      <span className="font-semibold">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{state.name}</td>
                  <td className="px-6 py-4 text-right text-primary font-semibold">
                    {state.avg_eco_points?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      state.aqi < 50 ? "bg-green-100 text-green-700" :
                      state.aqi < 100 ? "bg-yellow-100 text-yellow-700" :
                      state.aqi < 150 ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {state.aqi}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">{state.water_purity_index}</td>
                  <td className="px-6 py-4 text-right">{state.trees_per_sqkm}</td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/state/${state.name}`);
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
