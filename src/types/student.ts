// Student Portal Types

export interface StudentCourse {
  id: string;
  code: string;
  name: string;
  provider: string;
  providerLogo?: string;
  category: string;
  totalVideos: number;
  totalDuration: string;
  totalQuestions: number;
  modules: StudentModule[];
  progress: StudentProgress;
  certificateAvailable: boolean;
  examVoucher?: ExamVoucher;
}

export interface StudentModule {
  id: string;
  number: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  lessons: StudentLesson[];
  knowledgeChecks: KnowledgeCheck[];
  totalVideos: number;
  watchedVideos: number;
}

export interface StudentLesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'lab';
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  videoUrl?: string;
  thumbnailUrl?: string;
  watchedDuration?: string;
  totalDuration: string;
}

export interface KnowledgeCheck {
  id: string;
  title: string;
  moduleId: string;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'passed' | 'failed';
  questions: QuizQuestion[];
  passingScore: number;
  canRetake: boolean;
  lastAttemptDate?: string;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  selectedOptionId?: string;
  explanation?: string;
  isAnswered: boolean;
  isCorrect?: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface StudentProgress {
  overallProgress: number;
  modulesCompleted: number;
  totalModules: number;
  videosWatched: number;
  totalVideos: number;
  timeWatched: string;
  totalTime: string;
  averageScore: number;
  questionsAttempted: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentStreak: number;
  lastActivityDate: string;
}

export interface ExamVoucher {
  code: string;
  examName: string;
  expiryDate: string;
  isRedeemed: boolean;
  redeemedDate?: string;
  examScheduledDate?: string;
}

export interface QubitsModule {
  id: string;
  title: string;
  subtitle?: string;
  totalQuestions: number;
  unattempted: number;
  correctAnswers: number;
  correctPercentage: number;
  questionsToAttempt: number;
  isSelected: boolean;
}

export interface QubitsProgress {
  quizzesCompleted: number;
  questionsAttempted: number;
  overallScore: number;
}

export interface AdditionalResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'lab';
  url: string;
  description?: string;
  icon?: string;
}

export interface TrainerContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  specialization: string;
  hasUnreadMessages: boolean;
  messageCount: number;
}

export interface StudentNotification {
  id: string;
  type: 'reminder' | 'achievement' | 'deadline' | 'message';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export type TabType = 'qubits' | 'resources' | 'info' | 'coursebook' | 'trainer';
