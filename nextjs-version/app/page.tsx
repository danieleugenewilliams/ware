'use client';

import { useState } from 'react';
import JobDescriptionForm from '@/components/JobDescriptionForm';
import ScoreDisplays from '@/components/ScoreDisplays';
import ResultsDisplay from '@/components/ResultsDisplay';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12">
      <div className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="text-blue-500 dark:text-blue-400 font-bold text-xl">WARE Framework</div>
          <ThemeToggle />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4 text-blue-500 dark:text-blue-400">WARE Framework Analysis</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload or paste a job description below to get an analysis of automation resilience.
          </p>
        </div>

        <JobDescriptionForm 
          setIsLoading={setIsLoading}
          setError={setError}
          setResults={setResults}
        />

        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 mr-3"></div>
            <span>Analyzing...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mt-6" role="alert">
            {error}
          </div>
        )}

        {results && !isLoading && (
          <>
            <ScoreDisplays 
              preliminaryScore={results.preliminary_score}
              finalScore={results.final_score}
            />
            <ResultsDisplay 
              tasks={results.tasks || []}
              recommendations={results.recommendations || []}
              summary={results.summary}
            />
          </>
        )}
      </div>
    </main>
  );
}
