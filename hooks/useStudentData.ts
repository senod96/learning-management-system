import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { studentService } from '../services/api';
import { Timetable, Homework } from '../types';

interface StudentStats {
  todayClasses: number;
  pendingHomework: number;
  nextClassTime: string;
  dueSoon: number;
}

interface TodaySchedule {
  time: string;
  subject: string;
  teacher: string;
  classroom: string;
  color: string;
}

interface UpcomingHomework {
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  color: string;
}

export const useStudentData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StudentStats>({
    todayClasses: 0,
    pendingHomework: 0,
    nextClassTime: '',
    dueSoon: 0,
  });
  const [todaySchedule, setTodaySchedule] = useState<TodaySchedule[]>([]);
  const [upcomingHomework, setUpcomingHomework] = useState<UpcomingHomework[]>([]);

  useEffect(() => {
    if (user && user.role === 'STUDENT') {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, we'll use mock data since the API is not fully implemented
      // In a real application, you would fetch from the actual API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

      // Mock data - replace with actual API calls
      const mockStats: StudentStats = {
        todayClasses: 6,
        pendingHomework: 3,
        nextClassTime: '1:00 PM',
        dueSoon: 1,
      };

      const mockSchedule: TodaySchedule[] = [
        {
          time: '9:00',
          subject: 'Mathematics',
          teacher: 'Mr. Johnson',
          classroom: 'Room 101',
          color: 'blue',
        },
        {
          time: '11:00',
          subject: 'Physics',
          teacher: 'Dr. Smith',
          classroom: 'Lab 2',
          color: 'emerald',
        },
        {
          time: '1:00',
          subject: 'English',
          teacher: 'Ms. Davis',
          classroom: 'Room 205',
          color: 'purple',
        },
        {
          time: '3:00',
          subject: 'Chemistry',
          teacher: 'Dr. Wilson',
          classroom: 'Lab 1',
          color: 'orange',
        },
      ];

      const mockHomework: UpcomingHomework[] = [
        {
          title: 'Math Assignment #5',
          description: 'Algebra problems 1-20',
          subject: 'Mathematics',
          dueDate: 'Tomorrow',
          priority: 'high',
          color: 'red',
        },
        {
          title: 'Physics Lab Report',
          description: 'Pendulum experiment analysis',
          subject: 'Physics',
          dueDate: 'Friday',
          priority: 'medium',
          color: 'amber',
        },
        {
          title: 'English Essay',
          description: 'Character analysis - 500 words',
          subject: 'English',
          dueDate: 'Next Week',
          priority: 'low',
          color: 'blue',
        },
      ];

      setStats(mockStats);
      setTodaySchedule(mockSchedule);
      setUpcomingHomework(mockHomework);
    } catch (err) {
      setError('Failed to load student data. Please try again.');
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchStudentData();
  };

  return {
    loading,
    error,
    stats,
    todaySchedule,
    upcomingHomework,
    refreshData,
  };
};