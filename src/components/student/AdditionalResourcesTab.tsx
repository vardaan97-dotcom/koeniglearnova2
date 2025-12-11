'use client';

import React from 'react';
import {
  FileText,
  Video,
  Link as LinkIcon,
  Beaker,
  ExternalLink,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdditionalResource } from '@/types/student';

interface AdditionalResourcesTabProps {
  resources: AdditionalResource[];
}

export default function AdditionalResourcesTab({ resources }: AdditionalResourcesTabProps) {
  const getIcon = (type: AdditionalResource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'link':
        return <LinkIcon className="w-5 h-5 text-green-500" />;
      case 'lab':
        return <Beaker className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: AdditionalResource['type']) => {
    switch (type) {
      case 'pdf':
        return 'PDF Document';
      case 'video':
        return 'Video Tutorial';
      case 'link':
        return 'External Link';
      case 'lab':
        return 'Interactive Lab';
      default:
        return 'Resource';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Additional Learning Resources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50 transition-colors group"
          >
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
              {getIcon(resource.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">
                {resource.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-2">
                {getTypeLabel(resource.type)}
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            {resource.type === 'pdf' && (
              <button className="p-2 text-gray-400 hover:text-cyan-600 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
