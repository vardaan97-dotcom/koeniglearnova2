'use client';

import React, { useState } from 'react';
import {
  Play,
  User,
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StudentHeaderProps {
  studentName: string;
  learnerId: string;
  notificationCount?: number;
}

export default function StudentHeader({
  studentName,
  learnerId,
  notificationCount = 0,
}: StudentHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/student" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-cyan-600 tracking-tight">
              K<span className="text-gray-400">O</span>ENIG
            </span>
            <span className="text-xs text-gray-400 hidden sm:block">step forward</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/student/courses"
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-full hover:bg-cyan-700 transition-colors"
            >
              Explore All Courses
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              <Play className="w-4 h-4 text-cyan-600" />
              How LET Works
            </button>
            <Link
              href="/student/profile"
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Edit Your Profile
            </Link>
            <Link
              href="/student/faq"
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">Welcome</p>
                  <p className="text-sm font-semibold text-gray-900">{studentName}</p>
                  <p className="text-xs text-gray-400">(Your Learner ID is {learnerId})</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/student/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/student/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    href="/student/help"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
