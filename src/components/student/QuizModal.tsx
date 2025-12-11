'use client';

import React, { useState } from 'react';
import { X, Video, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuizQuestion, KnowledgeCheck } from '@/types/student';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: KnowledgeCheck;
  moduleTitle: string;
  courseTitle: string;
  onSubmit: (answers: Record<string, string>) => void;
  onSkip: () => void;
  onReviewVideo: () => void;
}

export default function QuizModal({
  isOpen,
  onClose,
  quiz,
  moduleTitle,
  courseTitle,
  onSubmit,
  onSkip,
  onReviewVideo,
}: QuizModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    onSubmit(selectedAnswers);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl my-8">
        {/* Header */}
        <div className="bg-cyan-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {moduleTitle} - <span className="font-normal">Total: {quiz.totalQuestions} questions</span>
              </h3>
              <p className="text-cyan-100 text-sm">
                PL-300 certification prep: {courseTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <p className="font-medium text-gray-900">
                  {index + 1}. {question.questionText}
                </p>
                <div className="space-y-2 ml-4">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border',
                        selectedAnswers[question.id] === option.id
                          ? 'bg-cyan-50 border-cyan-300'
                          : 'hover:bg-gray-50 border-gray-200'
                      )}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={selectedAnswers[question.id] === option.id}
                        onChange={() => handleOptionSelect(question.id, option.id)}
                        className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                      />
                      <span className="text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <button
            onClick={onReviewVideo}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
          >
            <Video className="w-4 h-4" />
            Review video
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onSkip}
              className="px-6 py-2.5 border border-cyan-600 text-cyan-600 rounded-lg font-medium hover:bg-cyan-50 transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
            >
              Submit test
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
