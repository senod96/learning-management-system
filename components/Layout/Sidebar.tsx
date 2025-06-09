import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  BookOpen, 
  User, 
  Clock, 
  FileText,
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const teacherLinks = [
    { to: '/dashboard', icon: Calendar, label: 'Dashboard' },
    { to: '/timetables', icon: Clock, label: 'Timetables' },
    { to: '/homeworks', icon: FileText, label: 'Homework' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const studentLinks = [
    { to: '/dashboard', icon: Calendar, label: 'Dashboard' },
    { to: '/timetable', icon: Clock, label: 'My Timetable' },
    { to: '/homework', icon: BookOpen, label: 'Homework' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const links = user?.role === 'TEACHER' ? teacherLinks : studentLinks;

  return (
    <aside className="bg-gray-50 w-64 min-h-screen border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;