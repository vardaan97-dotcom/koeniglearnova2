'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { TabType } from '@/types/student';

interface Tab {
  id: TabType;
  label: string;
  badge?: number;
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Tab[] = [
    { id: 'qubits', label: 'Qubits' },
    { id: 'resources', label: 'Additional Resources' },
    { id: 'info', label: 'Other Information' },
    { id: 'coursebook', label: 'Coursebook & Lab Access' },
    { id: 'trainer', label: 'Ask a Trainer', badge: 1 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-2 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative px-6 py-2.5 rounded-lg font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'bg-white border-2 border-cyan-500 text-cyan-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
            )}
          >
            {tab.label}
            {tab.badge && tab.badge > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
