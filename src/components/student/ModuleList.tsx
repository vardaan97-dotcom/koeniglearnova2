'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  Play,
  RotateCcw,
  HelpCircle,
  Lock,
  Clock,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudentModule, StudentLesson, KnowledgeCheck } from '@/types/student';

interface ModuleListProps {
  modules: StudentModule[];
  totalVideos: number;
  totalDuration: string;
  onWatchVideo: (lessonId: string) => void;
  onStartQuiz: (quizId: string) => void;
  onViewResults: (quizId: string) => void;
}

export default function ModuleList({
  modules,
  totalVideos,
  totalDuration,
  onWatchVideo,
  onStartQuiz,
  onViewResults,
}: ModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1']));
  const [visibleModules, setVisibleModules] = useState(11);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonStatusIcon = (status: StudentLesson['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Circle className="w-5 h-5 text-cyan-500 fill-cyan-100" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getLessonButton = (lesson: StudentLesson) => {
    switch (lesson.status) {
      case 'completed':
        return (
          <button
            onClick={() => onWatchVideo(lesson.id)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Rewatch
          </button>
        );
      case 'in_progress':
        return (
          <button
            onClick={() => onWatchVideo(lesson.id)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
          >
            <Play className="w-4 h-4" />
            Resume
          </button>
        );
      default:
        return (
          <button
            onClick={() => onWatchVideo(lesson.id)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
          >
            <Play className="w-4 h-4" />
            Watch
          </button>
        );
    }
  };

  const getQuizButton = (quiz: KnowledgeCheck) => {
    switch (quiz.status) {
      case 'passed':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartQuiz(quiz.id)}
              className="px-3 py-1.5 border border-cyan-200 text-cyan-600 rounded-lg text-sm font-medium hover:bg-cyan-50 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => onViewResults(quiz.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              View Results
            </button>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartQuiz(quiz.id)}
              className="px-3 py-1.5 border border-cyan-200 text-cyan-600 rounded-lg text-sm font-medium hover:bg-cyan-50 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => onViewResults(quiz.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              View Results
            </button>
          </div>
        );
      case 'in_progress':
        return (
          <button
            onClick={() => onStartQuiz(quiz.id)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
          >
            <Play className="w-4 h-4" />
            Resume
          </button>
        );
      default:
        return (
          <button
            onClick={() => onStartQuiz(quiz.id)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Attempt
          </button>
        );
    }
  };

  const displayedModules = modules.slice(0, visibleModules);
  const remainingModules = modules.length - visibleModules;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-cyan-600" />
            <h3 className="text-lg font-semibold text-cyan-600">Course Videos</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
              {totalVideos} videos
            </span>
            <span className="px-4 py-2 bg-cyan-50 rounded-lg text-sm font-medium text-cyan-700">
              {totalDuration}
              <br />
              <span className="text-xs text-gray-500">No. of questions</span>
            </span>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="divide-y divide-gray-100">
        {displayedModules.map((module) => (
          <div key={module.id}>
            {/* Module Header */}
            <div
              className={cn(
                'flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                module.isLocked && 'opacity-50'
              )}
              onClick={() => !module.isLocked && toggleModule(module.id)}
            >
              <button className="text-gray-400">
                {expandedModules.has(module.id) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {module.isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : module.isLocked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}

              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  Module {module.number}: {module.title}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">
                  {module.watchedVideos}/{module.totalVideos} watched
                </span>
                <button
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    module.watchedVideos > 0
                      ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  )}
                >
                  <Play className="w-4 h-4" />
                  {module.watchedVideos > 0 ? 'Resume' : 'Watch'}
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">
                  {module.duration}
                </span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedModules.has(module.id) && !module.isLocked && (
              <div className="bg-gray-50 px-4 pb-4">
                {/* Knowledge Checks */}
                {module.knowledgeChecks.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center gap-4 p-3 bg-white rounded-lg mb-2 border border-gray-100"
                  >
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    {quiz.status === 'passed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className="flex-1 text-sm text-gray-700">{quiz.title}</span>
                    {getQuizButton(quiz)}
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">
                      {quiz.attemptedQuestions}/{quiz.totalQuestions} answered
                    </span>
                  </div>
                ))}

                {/* Lessons */}
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-4 p-3 bg-white rounded-lg mb-2 border border-gray-100 ml-8"
                  >
                    {getLessonStatusIcon(lesson.status)}
                    <span className="flex-1 text-sm text-gray-700">{lesson.title}</span>
                    {getLessonButton(lesson)}
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More */}
      {remainingModules > 0 && (
        <div className="p-4 text-center border-t border-gray-100">
          <button
            onClick={() => setVisibleModules((prev) => prev + 5)}
            className="text-cyan-600 font-medium hover:text-cyan-700 transition-colors"
          >
            {remainingModules} more modules
          </button>
        </div>
      )}
    </div>
  );
}
