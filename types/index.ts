export interface User {
  id: string;
  email: string;
  name: string;
  role: 'TEACHER' | 'STUDENT';
  createdAt: string;
  updatedAt: string;
}

export interface Teacher extends User {
  role: 'TEACHER';
  subjects: string[];
  qualifications?: string;
  phoneNumber?: string;
}

export interface Student extends User {
  role: 'STUDENT';
  grade: string;
  studentId: string;
  parentEmail?: string;
  phoneNumber?: string;
}

export interface Timetable {
  id: string;
  grade: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  startTime: string;
  endTime: string;
  classroom: string;
  createdAt: string;
  updatedAt: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'TEACHER' | 'STUDENT') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}