// src/components/reports/SkillRadarChart.tsx
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type Skill = {
  name: string;
  current: number;
  required: number;
  fullMark: number;
};

type SkillRadarChartProps = {
  skills: Skill[];
  colors?: {
    currentSkill: string;
    requiredSkill: string;
  };
};

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ 
  skills, 
  colors = { currentSkill: '#8884d8', requiredSkill: '#82ca9d' } 
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Current Skills"
          dataKey="current"
          stroke={colors.currentSkill}
          fill={colors.currentSkill}
          fillOpacity={0.6}
        />
        <Radar
          name="Required Skills"
          dataKey="required"
          stroke={colors.requiredSkill}
          fill={colors.requiredSkill}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillRadarChart;