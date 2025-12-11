'use client';

import React from 'react';
import { BarChart3, Monitor, Clock, TrendingUp, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudentProgress } from '@/types/student';
import CircularProgress from '@/components/CircularProgress';

interface ProgressOverviewProps {
  progress: StudentProgress;
  className?: string;
}

export default function ProgressOverview({ progress, className = '' }: ProgressOverviewProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-gray-200 p-6', className)}>
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
        Progress Overview
      </h3>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <BarChart3 className="w-5 h-5 text-cyan-600" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{progress.overallProgress}%</span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-600 rounded-full transition-all duration-500"
              style={{ width: `${progress.overallProgress}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center mt-2">
          <span className="font-semibold">{progress.modulesCompleted}/{progress.totalModules}</span> modules completed
        </p>
        <p className="text-xs text-gray-400 text-center">Overall Progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Videos Watched */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <div className="relative">
            <CircularProgress
              value={progress.videosWatched}
              max={progress.totalVideos}
              size={70}
              strokeWidth={6}
              valueFormat="fraction"
              colorClass="stroke-cyan-500"
            />
            <Monitor className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Videos Watched</p>
        </div>

        {/* Time Watched */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <div className="relative flex flex-col items-center justify-center h-[70px]">
            <Clock className="w-5 h-5 text-cyan-500 mb-1" />
            <span className="text-lg font-bold text-gray-900">{progress.timeWatched}</span>
            <div className="w-12 h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-cyan-500 rounded-full"
                style={{
                  width: `${Math.min(
                    (parseFloat(progress.timeWatched) / parseFloat(progress.totalTime)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{progress.totalTime} total</p>
          <p className="text-xs text-gray-400">Time Watched</p>
        </div>

        {/* Average Score */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <div className="relative">
            <CircularProgress
              value={progress.averageScore}
              max={100}
              size={70}
              strokeWidth={6}
              valueFormat="percentage"
              colorClass={progress.averageScore >= 70 ? 'stroke-green-500' : 'stroke-cyan-500'}
            />
            <TrendingUp className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Average Score</p>
        </div>

        {/* Questions Attempted */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <div className="relative">
            <CircularProgress
              value={progress.questionsAttempted}
              max={progress.totalQuestions}
              size={70}
              strokeWidth={6}
              valueFormat="fraction"
              colorClass="stroke-cyan-500"
            />
            <HelpCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Questions Attempted</p>
        </div>

        {/* Correct Answers */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <div className="relative">
            <CircularProgress
              value={progress.correctAnswers}
              max={progress.questionsAttempted || 1}
              size={70}
              strokeWidth={6}
              valueFormat="fraction"
              colorClass="stroke-green-500"
            />
            <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Correct Answers</p>
        </div>

        {/* Incorrect Answers */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <div className="relative">
            <CircularProgress
              value={progress.incorrectAnswers}
              max={progress.questionsAttempted || 1}
              size={70}
              strokeWidth={6}
              valueFormat="fraction"
              colorClass="stroke-red-400"
            />
            <XCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Incorrect Answers</p>
        </div>
      </div>
    </div>
  );
}
