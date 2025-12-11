'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  PictureInPicture,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
  lessonTitle: string;
  courseTitle: string;
  videoUrl?: string;
  currentTime?: string;
  totalTime?: string;
  onComplete?: () => void;
  showCompletionMessage?: boolean;
  countdownSeconds?: number;
}

export default function VideoPlayer({
  isOpen,
  onClose,
  moduleTitle,
  lessonTitle,
  courseTitle,
  currentTime = '0:09',
  totalTime = '2:26',
  showCompletionMessage = false,
  countdownSeconds = 10,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl">
        {/* Header */}
        <div className="bg-cyan-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{moduleTitle}</h3>
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

        {/* Video Container */}
        <div className="relative bg-gray-900 aspect-video">
          {/* Placeholder Video Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {/* Simulated video content */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <p className="text-gray-400">Video Player Placeholder</p>
              </div>
            </div>
          </div>

          {/* Completion Message Overlay */}
          {showCompletionMessage && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="bg-white rounded-xl p-8 text-center max-w-md mx-4">
                <div className="w-16 h-16 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-green-600 mb-2">
                  Great job - module complete!
                </h4>
                <p className="text-gray-600 mb-4">
                  Knowledge Check starts automatically in {countdownSeconds} seconds.
                </p>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-cyan-600 font-semibold mx-2">{countdownSeconds}</span>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* Ask a Trainer Button */}
          <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium hover:bg-white transition-colors shadow-lg">
            <MessageCircle className="w-4 h-4 text-red-500" />
            Ask a Trainer
            <X className="w-3 h-3 text-gray-400" />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div className="h-full bg-cyan-500" style={{ width: '6%' }} />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="px-3 py-1 bg-gray-800 text-white rounded text-sm font-medium">
                {playbackSpeed}x
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <RotateCw className="w-5 h-5" />
              </button>
              <span className="text-white text-sm">
                {currentTime} / {totalTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <PictureInPicture className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
