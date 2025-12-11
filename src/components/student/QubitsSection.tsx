'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  ChevronDown,
  Play,
  Share2,
  Award,
  CheckSquare,
  Square,
  ChevronUp,
  List,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QubitsModule, QubitsProgress } from '@/types/student';
import CircularProgress from '@/components/CircularProgress';

interface QubitsSectionProps {
  modules: QubitsModule[];
  progress: QubitsProgress;
  onStartTest: (moduleId: string) => void;
  onReset: () => void;
  onRequestAcclaim: () => void;
}

export default function QubitsSection({
  modules,
  progress,
  onStartTest,
  onReset,
  onRequestAcclaim,
}: QubitsSectionProps) {
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    modules.forEach((m) => {
      initial[m.id] = m.questionsToAttempt;
    });
    return initial;
  });

  const toggleModule = (moduleId: string) => {
    const newSelected = new Set(selectedModules);
    if (newSelected.has(moduleId)) {
      newSelected.delete(moduleId);
    } else {
      newSelected.add(moduleId);
    }
    setSelectedModules(newSelected);
  };

  const selectAll = () => {
    if (selectedModules.size === modules.length) {
      setSelectedModules(new Set());
    } else {
      setSelectedModules(new Set(modules.map((m) => m.id)));
    }
  };

  const adjustQuestionCount = (moduleId: string, delta: number) => {
    setQuestionCounts((prev) => {
      const current = prev[moduleId] || 9;
      const newValue = Math.max(1, Math.min(10, current + delta));
      return { ...prev, [moduleId]: newValue };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Reset all the questions to improve your score:</p>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors">
              Multiple Choice Questions
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Share your achievement:</p>
          <button
            onClick={onRequestAcclaim}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Request for Your Acclaim
          </button>
        </div>
      </div>

      {/* Select All */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Select all modules to begin your learning:</p>
        <button
          onClick={selectAll}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {selectedModules.size === modules.length ? (
            <CheckSquare className="w-5 h-5 text-cyan-600" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )}
          <span className="text-gray-700">Select All</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Cards */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.title}</h4>
                    {module.subtitle && (
                      <p className="text-sm text-gray-500">{module.subtitle}</p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="p-1"
                  >
                    {selectedModules.has(module.id) ? (
                      <CheckSquare className="w-5 h-5 text-cyan-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-cyan-600">Total Questions</span>
                  <span className="text-red-500">Unattempted</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold mb-4">
                  <span className="text-cyan-600">{module.totalQuestions}</span>
                  <span className="text-red-500">{module.unattempted}</span>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  Correct Answer:{' '}
                  <span className="text-green-600 font-semibold">
                    {module.correctAnswers} ({module.correctPercentage}%)
                  </span>
                </div>

                {/* Question Count Selector */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    Choose No. of<br />Questions to Attempt
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-center font-medium text-gray-900">
                      {questionCounts[module.id] || 9}
                    </span>
                    <div className="flex flex-col">
                      <button
                        onClick={() => adjustQuestionCount(module.id, 1)}
                        className="p-0.5 hover:bg-gray-100 rounded"
                      >
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => adjustQuestionCount(module.id, -1)}
                        className="p-0.5 hover:bg-gray-100 rounded"
                      >
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Start Test Button */}
                <button
                  onClick={() => onStartTest(module.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
              Dashboard
            </h3>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                <List className="w-6 h-6 text-gray-500 mb-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {progress.quizzesCompleted}
                </span>
                <span className="text-xs text-gray-500 text-center">
                  Quizzes Completed
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                <HelpCircle className="w-6 h-6 text-gray-500 mb-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {progress.questionsAttempted}
                </span>
                <span className="text-xs text-gray-500 text-center">
                  Questions Attempted
                </span>
              </div>
            </div>

            {/* Score Circle */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#22c55e"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(progress.overallScore / 100) * 352} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {progress.overallScore}%
                  </span>
                  <span className="text-xs text-gray-500">Your Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
