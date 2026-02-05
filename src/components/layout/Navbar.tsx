import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Swords, LayoutDashboard, Trophy } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-indigo-600 rounded-lg group-hover:rotate-12 transition-transform">
          <Swords className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block">Code<span className="text-indigo-500">Arena</span></span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                location.pathname === item.path ? "text-indigo-400 bg-indigo-500/10" : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="h-6 w-px bg-gray-800 mx-2" />

        <Link to="/profile/johndoe" className="flex items-center gap-2 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none">John Doe</p>
            <p className="text-[10px] text-gray-500 font-mono">1420 RP</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/johndoe/40/40" alt="Avatar" />
          </div>
        </Link>
      </div>
    </nav>
  );
};