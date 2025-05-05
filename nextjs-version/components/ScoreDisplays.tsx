'use client';

import { normalizeScore, calculateResilienceLevel } from '@/utils/scoreHelpers';
import { useTheme } from '@/contexts/ThemeContext';

interface ScoreDisplaysProps {
  preliminaryScore: number;
  finalScore: number;
}

export default function ScoreDisplays({ preliminaryScore, finalScore }: ScoreDisplaysProps) {
  const { theme } = useTheme();
  const normalizedPreliminary = normalizeScore(preliminaryScore);
  const normalizedFinal = normalizeScore(finalScore);
  const resilienceLevel = calculateResilienceLevel(normalizedFinal);

  // Determine which color to use based on the theme
  const colorMode = theme === 'dark' || 
    (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) 
      ? 'dark' : 'light';

  return (
    <div className="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 my-8">
      <h2 className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-4">Score Analysis</h2>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-center flex-1">
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Preliminary Score</h3>
          <div className="text-3xl font-semibold text-blue-500 dark:text-blue-400">{normalizedPreliminary}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Initial assessment score</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-center flex-1">
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Final Score</h3>
          <div className="text-3xl font-semibold text-blue-500 dark:text-blue-400">{normalizedFinal}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">WARE framework analysis result</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-center flex-1">
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Automation Resilience</h3>
          <div className="text-3xl font-semibold" style={{ color: resilienceLevel.color[colorMode] }}>
            {resilienceLevel.label.split(' - ')[0]}
          </div>
          <p className="text-sm font-medium mt-1" style={{ color: resilienceLevel.color[colorMode] }}>
            {resilienceLevel.label.split(' - ')[1]}
          </p>
        </div>
      </div>
    </div>
  );
}