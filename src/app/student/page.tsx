'use client';

import React, { useState, useCallback } from 'react';
import StudentHeader from '@/components/student/StudentHeader';
import CourseHeader from '@/components/student/CourseHeader';
import ProgressOverview from '@/components/student/ProgressOverview';
import ModuleList from '@/components/student/ModuleList';
import VideoPlayer from '@/components/student/VideoPlayer';
import QuizModal from '@/components/student/QuizModal';
import QubitsSection from '@/components/student/QubitsSection';
import TabNavigation from '@/components/student/TabNavigation';
import AdditionalResourcesTab from '@/components/student/AdditionalResourcesTab';
import {
  studentCourse,
  qubitsModules,
  qubitsProgress,
  additionalResources,
  trainerContact,
  currentStudent,
} from '@/data/studentMockData';
import type { TabType, StudentLesson, KnowledgeCheck, StudentModule } from '@/types/student';
import { BookOpen, FileText, MessageCircle, Info } from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('qubits');
  const [currentLesson, setCurrentLesson] = useState<StudentLesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<KnowledgeCheck | null>(null);

  // Find lesson by ID from all modules
  const findLessonById = useCallback((lessonId: string): StudentLesson | null => {
    for (const module of studentCourse.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  }, []);

  // Find quiz by ID from all modules
  const findQuizById = useCallback((quizId: string): KnowledgeCheck | null => {
    for (const module of studentCourse.modules) {
      const quiz = module.knowledgeChecks.find((q) => q.id === quizId);
      if (quiz) return quiz;
    }
    return null;
  }, []);

  const handleWatchVideo = useCallback((lessonId: string) => {
    const lesson = findLessonById(lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
    }
  }, [findLessonById]);

  const handleStartQuiz = useCallback((quizId: string) => {
    const quiz = findQuizById(quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
    }
  }, [findQuizById]);

  const handleViewResults = useCallback((quizId: string) => {
    // In a real app, this would show the quiz results
    console.log('Viewing results for quiz:', quizId);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setCurrentLesson(null);
  }, []);

  const handleCloseQuiz = useCallback(() => {
    setCurrentQuiz(null);
  }, []);

  const handleVideoComplete = useCallback(() => {
    // In a real app, this would update the lesson status
    console.log('Video completed:', currentLesson?.title);
    setCurrentLesson(null);
  }, [currentLesson]);

  const handleQuizSubmit = useCallback((answers: Record<string, string>) => {
    // In a real app, this would submit answers and calculate score
    console.log('Quiz submitted:', answers);
    setCurrentQuiz(null);
  }, []);

  const handleStartQubitsTest = useCallback((moduleId: string) => {
    // In a real app, this would navigate to the test or open a test modal
    console.log('Starting Qubits test for module:', moduleId);
  }, []);

  const handleResetQubits = useCallback(() => {
    // In a real app, this would reset all Qubits progress
    console.log('Resetting Qubits progress');
  }, []);

  const handleRequestAcclaim = useCallback(() => {
    // In a real app, this would open an acclaim request modal
    console.log('Requesting acclaim');
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'qubits':
        return (
          <QubitsSection
            modules={qubitsModules}
            progress={qubitsProgress}
            onStartTest={handleStartQubitsTest}
            onReset={handleResetQubits}
            onRequestAcclaim={handleRequestAcclaim}
          />
        );
      case 'resources':
        return <AdditionalResourcesTab resources={additionalResources} />;
      case 'info':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-600" />
              Course Information
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">About This Course</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This comprehensive course covers all aspects of Microsoft Azure administration,
                  including managing Azure identities and governance, implementing and managing storage,
                  deploying and managing Azure compute resources, configuring and managing virtual networking,
                  and monitoring and backing up Azure resources.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Prerequisites</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Understanding of on-premises virtualization technologies</li>
                  <li>Basic knowledge of networking concepts</li>
                  <li>Experience with PowerShell or Azure CLI</li>
                  <li>Familiarity with the Azure portal</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Certification</h4>
                <p className="text-gray-600 text-sm">
                  Upon completion, you&apos;ll be prepared for the AZ-104: Microsoft Azure Administrator
                  certification exam. Your exam voucher is included with this course.
                </p>
              </div>
            </div>
          </div>
        );
      case 'coursebook':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Coursebook & Lab Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-colors group"
              >
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-white transition-colors">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                    Download Coursebook
                  </h4>
                  <p className="text-sm text-gray-500">PDF format, 45 MB</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50 transition-colors group"
              >
                <div className="p-3 bg-cyan-100 rounded-lg group-hover:bg-white transition-colors">
                  <BookOpen className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">
                    Access Lab Environment
                  </h4>
                  <p className="text-sm text-gray-500">Hands-on Azure labs</p>
                </div>
              </a>
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Lab access is available for 180 days from your enrollment date.
                Your access expires on March 15, 2025.
              </p>
            </div>
          </div>
        );
      case 'trainer':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              Ask Your Trainer
            </h3>
            <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {trainerContact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{trainerContact.name}</h4>
                <p className="text-sm text-gray-500">{trainerContact.specialization}</p>
                <p className="text-sm text-cyan-600 mt-1">{trainerContact.email}</p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is your question about?"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Question
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your question here..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Send Question
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader
        studentName={currentStudent.visibleName}
        learnerId={currentStudent.learnerId}
        notificationCount={3}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <CourseHeader course={studentCourse} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Module List */}
          <div className="lg:col-span-3 space-y-6">
            <ModuleList
              modules={studentCourse.modules}
              totalVideos={studentCourse.progress.videosWatched + (studentCourse.progress.totalVideos - studentCourse.progress.videosWatched)}
              totalDuration={studentCourse.progress.totalTime}
              onWatchVideo={handleWatchVideo}
              onStartQuiz={handleStartQuiz}
              onViewResults={handleViewResults}
            />

            {/* Tab Content */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            {renderTabContent()}
          </div>

          {/* Sidebar - Progress Overview */}
          <div className="lg:col-span-1">
            <ProgressOverview progress={studentCourse.progress} />
          </div>
        </div>
      </main>

      {/* Video Player Modal */}
      {currentLesson && (
        <VideoPlayer
          isOpen={true}
          onClose={handleCloseVideo}
          moduleTitle={`Module Video`}
          lessonTitle={currentLesson.title}
          courseTitle={studentCourse.name}
          currentTime="0:00"
          totalTime={currentLesson.duration}
          onComplete={handleVideoComplete}
        />
      )}

      {/* Quiz Modal */}
      {currentQuiz && (
        <QuizModal
          isOpen={true}
          quiz={currentQuiz}
          moduleTitle={currentQuiz.title}
          courseTitle={studentCourse.name}
          onClose={handleCloseQuiz}
          onSubmit={handleQuizSubmit}
          onSkip={handleCloseQuiz}
          onReviewVideo={handleCloseQuiz}
        />
      )}
    </div>
  );
}
