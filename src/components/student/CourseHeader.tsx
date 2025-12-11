'use client';

import React from 'react';
import { ChevronDown, Download, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudentCourse } from '@/types/student';

interface CourseHeaderProps {
  course: StudentCourse;
  onAskTrainer?: () => void;
  trainerMessageCount?: number;
}

export default function CourseHeader({
  course,
  onAskTrainer,
  trainerMessageCount = 0,
}: CourseHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Microsoft Partner Badge */}
        <div className="flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-4 w-fit">
            <div className="flex items-center gap-2 mb-1">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                <div className="bg-[#f25022] rounded-sm"></div>
                <div className="bg-[#7fba00] rounded-sm"></div>
                <div className="bg-[#00a4ef] rounded-sm"></div>
                <div className="bg-[#ffb900] rounded-sm"></div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Microsoft</p>
                <p className="text-[10px] text-gray-500">Solutions Partner</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400">Microsoft Cloud</p>
            <div className="mt-2 bg-cyan-600 text-white text-[10px] px-2 py-1 rounded">
              Training Services
            </div>
            <p className="text-sm font-bold text-gray-900 mt-2">Microsoft</p>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-2">Course Topic:</p>
          <button className="flex items-center gap-2 px-6 py-3 bg-cyan-50 border-2 border-cyan-200 rounded-full text-cyan-700 font-semibold hover:bg-cyan-100 transition-colors">
            {course.code}: {course.name}
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
              course.certificateAvailable
                ? 'bg-gray-700 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
            disabled={!course.certificateAvailable}
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
          <button
            onClick={onAskTrainer}
            className="relative flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Ask a Trainer
            {trainerMessageCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {trainerMessageCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
