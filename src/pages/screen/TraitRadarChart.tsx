import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface TraitRadarChartProps {
  traits: Record<string, number>;
  traitMap: Record<string, string>;
}

export function TraitRadarChart({ traits, traitMap }: TraitRadarChartProps) {
  const data = Object.entries(traits)
    .filter(([_, score]) => score > 0) // Optionally filter out 0 scores
    .map(([id, score]) => ({
      trait: traitMap[id] || id.slice(0, 6), // fallback if name not found
      score,
    }));

  return (
    <div className="w-full h-80 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="trait" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="Trait Score"
            dataKey="score"
            stroke="#605CFF"
            fill="#605CFF"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
