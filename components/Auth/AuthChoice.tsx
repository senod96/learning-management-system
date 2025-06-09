import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

const AuthChoice: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            School Management System
          </h1>
          <p className="text-xl text-gray-600">
            Choose your role to access the system
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/login/teacher"
            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Users className="h-16 w-16 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Teacher Portal
              </h2>
              <p className="text-gray-600 mb-6">
                Manage timetables, upload homework, and track student progress
              </p>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium group-hover:bg-blue-100 transition-colors">
                Login as Teacher
              </div>
            </div>
          </Link>
          
          <Link
            to="/login/student"
            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <BookOpen className="h-16 w-16 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Student Portal
              </h2>
              <p className="text-gray-600 mb-6">
                View your timetable, check homework assignments, and manage your profile
              </p>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium group-hover:bg-emerald-100 transition-colors">
                Login as Student
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthChoice;