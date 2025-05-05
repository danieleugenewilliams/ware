'use client';

import React, { useState, FormEvent } from 'react';
import { analyzeLLM } from '@/utils/api';

interface JobDescriptionFormProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setResults: (results: any) => void;
}

export default function JobDescriptionForm({ setIsLoading, setError, setResults }: JobDescriptionFormProps) {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (jobDescription.trim().length < 20) {
      setError('Please provide a more detailed job description for analysis.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the API utility function with improved error handling
      const parsedResponse = await analyzeLLM(jobDescription);
      
      // Set results
      setResults(parsedResponse);
    } catch (error) {
      console.error('Error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          setError('Unable to connect to the analysis service. This may be due to browser security restrictions when accessing localhost. Try running both the Next.js app and API server on HTTPS or on the same origin.');
        } else if (error.message.includes('API error')) {
          setError(`API error: ${error.message}. Please check that your API server is running.`);
        } else {
          setError(`An error occurred: ${error.message}`);
        }
      } else {
        setError('An unknown error occurred while processing your request. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-4">Job Description Analysis</h2>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="mb-5">
          <label htmlFor="jobDescription" className="block text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
            Paste Job Description Here:
          </label>
          <textarea
            id="jobDescription"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            rows={10}
            maxLength={16000}
            placeholder="Enter a detailed job description for analysis..."
            required
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Minimum 20 characters required for accurate analysis
          </p>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 transition-colors"
        >
          Analyze Job Description
        </button>
      </form>
    </div>
  );
}