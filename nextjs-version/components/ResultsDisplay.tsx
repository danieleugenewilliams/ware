'use client';

import React from 'react';

interface Task {
  task: string;
  category: string;
  category_explanation: string;
  weight: number;
  weight_explanation: string;
  automation_outlook: string;
}

interface ResultsDisplayProps {
  summary: string;
  tasks: Task[];
  recommendations: string[];
}

export default function ResultsDisplay({ summary, tasks, recommendations }: ResultsDisplayProps) {
  return (
    <div className="results-container mt-6 mb-10">
      <div className="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-4">Analysis Summary</h2>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{summary}</p>
      </div>

      <div className="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-4">Task Analysis</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {tasks.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">{t.task}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><span className="font-semibold">Category:</span> {t.category}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><span className="font-semibold">Why:</span> {t.category_explanation}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><span className="font-semibold">Weight:</span> {t.weight}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><span className="font-semibold">Why weight:</span> {t.weight_explanation}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold">Outlook:</span> {t.automation_outlook}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-4">Recommendations</h2>
        <ul className="list-decimal list-inside text-gray-800 dark:text-gray-200">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="mb-2">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}