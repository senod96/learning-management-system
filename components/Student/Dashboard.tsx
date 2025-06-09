import React from 'react';
import { Calendar, BookOpen, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { useStudentData } from '../../hooks/useStudentData';
import LoadingState from '../Common/LoadingState';
import ErrorState from '../Common/ErrorState';

const StudentDashboard: React.FC = () => {
  const { loading, error, stats, todaySchedule, upcomingHomework, refreshData } = useStudentData();

  if (loading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refreshData} />;
  }

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
    };
    return colorMap[color as keyof typeof colorMap]?.[type] || colorMap.blue[type];
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      high: 'Due Tomorrow',
      medium: 'Due Friday',
      low: 'Due Next Week',
    };
    return labels[priority as keyof typeof labels] || 'Due Soon';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your overview for today.</p>
        </div>
        <button
          onClick={refreshData}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Classes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayClasses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Homework</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingHomework}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Class</p>
              <p className="text-2xl font-bold text-gray-900">{stats.nextClassTime}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Due Soon</p>
              <p className="text-2xl font-bold text-gray-900">{stats.dueSoon}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Today's Schedule and Upcoming Homework */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
            <span className="text-sm text-gray-500">{todaySchedule.length} classes</span>
          </div>
          <div className="space-y-4">
            {todaySchedule.map((classItem, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-lg border transition-all hover:shadow-sm ${getColorClasses(classItem.color, 'bg')} ${getColorClasses(classItem.color, 'border')}`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(classItem.color, 'text').replace('text-', 'bg-').replace('-600', '-600')}`}>
                    <span className="text-white text-sm font-bold">{classItem.time}</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-gray-900">{classItem.subject}</p>
                  <p className="text-sm text-gray-600">{classItem.classroom} • {classItem.teacher}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${getColorClasses(classItem.color, 'text').replace('text-', 'bg-')}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Homework</h2>
            <span className="text-sm text-gray-500">{upcomingHomework.length} assignments</span>
          </div>
          <div className="space-y-4">
            {upcomingHomework.map((homework, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-all hover:shadow-sm ${getColorClasses(homework.color, 'bg')} ${getColorClasses(homework.color, 'border')}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{homework.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{homework.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{homework.subject}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getColorClasses(homework.color, 'bg')} ${getColorClasses(homework.color, 'text')}`}>
                    {getPriorityLabel(homework.priority)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`w-full bg-gray-200 rounded-full h-1.5`}>
                    <div 
                      className={`h-1.5 rounded-full ${getColorClasses(homework.color, 'text').replace('text-', 'bg-')}`}
                      style={{ width: homework.priority === 'high' ? '85%' : homework.priority === 'medium' ? '60%' : '30%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Calendar className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">View Full Timetable</p>
              <p className="text-sm text-gray-600">See all your classes</p>
            </div>
          </button>
          <button className="flex items-center p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <BookOpen className="h-5 w-5 text-emerald-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">All Homework</p>
              <p className="text-sm text-gray-600">Manage assignments</p>
            </div>
          </button>
          <button className="flex items-center p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Clock className="h-5 w-5 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Update Profile</p>
              <p className="text-sm text-gray-600">Edit your information</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;