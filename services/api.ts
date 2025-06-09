import { User, Teacher, Student, Timetable, Homework, ApiResponse, PaginatedResponse } from '../types';

// Mock API service - replace with actual Spring Boot API calls
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    // For now, return mock data - replace with actual fetch calls
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getMockResponse<T>(endpoint, options));
      }, 500);
    });
  }

  private getMockResponse<T>(endpoint: string, options: RequestInit): ApiResponse<T> {
    // Mock responses for development - replace with actual API calls
    if (endpoint.includes('/auth/login')) {
      const mockUser: User = {
        id: '1',
        email: 'teacher@school.com',
        name: 'John Doe',
        role: 'TEACHER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: { token: 'mock-jwt-token', user: mockUser } as T,
      };
    }
    
    return {
      success: true,
      data: [] as T,
    };
  }

  // Auth endpoints
  auth = {
    login: (credentials: { email: string; password: string; role: 'TEACHER' | 'STUDENT' }) =>
      this.request<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
  };

  // Teacher endpoints
  teachers = {
    getProfile: (id: string) =>
      this.request<Teacher>(`/teachers/${id}`),
    
    updateProfile: (id: string, data: Partial<Teacher>) =>
      this.request<Teacher>(`/teachers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    getTimetables: (teacherId: string, page = 0, size = 10) =>
      this.request<PaginatedResponse<Timetable>>(`/teachers/${teacherId}/timetables?page=${page}&size=${size}`),

    createTimetable: (data: Omit<Timetable, 'id' | 'createdAt' | 'updatedAt'>) =>
      this.request<Timetable>('/timetables', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    updateTimetable: (id: string, data: Partial<Timetable>) =>
      this.request<Timetable>(`/timetables/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    deleteTimetable: (id: string) =>
      this.request<void>(`/timetables/${id}`, {
        method: 'DELETE',
      }),

    getHomeworks: (teacherId: string, page = 0, size = 10) =>
      this.request<PaginatedResponse<Homework>>(`/teachers/${teacherId}/homeworks?page=${page}&size=${size}`),

    createHomework: (data: Omit<Homework, 'id' | 'createdAt' | 'updatedAt'>) =>
      this.request<Homework>('/homeworks', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    updateHomework: (id: string, data: Partial<Homework>) =>
      this.request<Homework>(`/homeworks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    deleteHomework: (id: string) =>
      this.request<void>(`/homeworks/${id}`, {
        method: 'DELETE',
      }),
  };

  // Student endpoints
  students = {
    getProfile: (id: string) =>
      this.request<Student>(`/students/${id}`),

    updateProfile: (id: string, data: Partial<Student>) =>
      this.request<Student>(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    getTimetables: (grade: string, page = 0, size = 10) =>
      this.request<PaginatedResponse<Timetable>>(`/students/timetables?grade=${grade}&page=${page}&size=${size}`),

    getHomeworks: (grade: string, page = 0, size = 10) =>
      this.request<PaginatedResponse<Homework>>(`/students/homeworks?grade=${grade}&page=${page}&size=${size}`),
  };

  // File upload
  files = {
    upload: (file: File, type: 'homework' | 'profile') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      return this.request<{ url: string; fileName: string }>('/files/upload', {
        method: 'POST',
        body: formData,
        headers: {}, // Don't set Content-Type for FormData
      });
    },
  };
}

export const authService = new ApiService().auth;
export const teacherService = new ApiService().teachers;
export const studentService = new ApiService().students;
export const fileService = new ApiService().files;