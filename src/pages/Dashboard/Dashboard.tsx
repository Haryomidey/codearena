import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Play, History, TrendingUp, Users, Swords, X, Code2, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '../../utils/cn';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [selectedDiff, setSelectedDiff] = useState('Medium');

  const stats = [
    { label: 'Global Rank', value: '#1,204', icon: TrendingUp, color: 'text-indigo-500' },
    { label: 'Matches Played', value: '152', icon: Play, color: 'text-cyan-500' },
    { label: 'Win Rate', value: '68%', icon: History, color: 'text-emerald-500' },
    { label: 'Followers', value: '840', icon: Users, color: 'text-rose-500' },
  ];

  const recentMatches = [
    { id: '1', opponent: 'AliceCode', status: 'Win', time: '2h ago', difficulty: 'Medium' },
    { id: '2', opponent: 'DevGuru', status: 'Loss', time: '5h ago', difficulty: 'Hard' },
    { id: '3', opponent: 'CodeWarrior', status: 'Win', time: '1d ago', difficulty: 'Easy' },
  ];

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'JS' },
    { id: 'typescript', name: 'TypeScript', icon: 'TS' },
    { id: 'python', name: 'Python', icon: 'PY' },
    { id: 'cpp', name: 'C++', icon: 'C+' },
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleStartChallenge = () => {
    navigate(`/battle/room-${Math.floor(Math.random() * 1000)}?lang=${selectedLang}&diff=${selectedDiff}`);
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-400">You are in the top 5% of developers this week.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/leaderboard')}>
            <Users className="w-4 h-4 mr-2" />
            Top Legends
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={stat.color} />
              <span className="text-xs text-gray-500 font-medium">This Month</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Main Grid... (keep previous match history implementation) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" />
            Recent Matches
          </h2>
          <div className="space-y-4">
            {recentMatches.map((match) => (
              <Card key={match.id} className="p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${match.opponent}/48/48`} alt="Opponent" />
                  </div>
                  <div>
                    <h4 className="font-bold cursor-pointer hover:text-indigo-400" onClick={() => navigate(`/profile/${match.opponent}`)}>vs {match.opponent}</h4>
                    <p className="text-xs text-gray-500">{match.time} • {match.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={match.status === 'Win' ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
                    {match.status}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/results/${match.id}`)}>
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Live Battles section... (keep previous implementation) */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
            Live Battles
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 border-l-4 border-indigo-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">In Progress</span>
                  <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                    <Users className="w-3 h-3" /> 124
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-sm font-bold">DevA</span>
                  <Swords className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-bold">DevB</span>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/spectate/abc')}>
                  Spectate
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Challenge Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Swords className="w-6 h-6 text-indigo-500" /> Create Challenge
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4">Choose Language</label>
                  <div className="grid grid-cols-4 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setSelectedLang(lang.id)}
                        className={cn(
                          "p-4 rounded-2xl border transition-all flex flex-col items-center gap-2",
                          selectedLang === lang.id 
                            ? "bg-indigo-500/10 border-indigo-500 text-white" 
                            : "bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-700"
                        )}
                      >
                        <Code2 className="w-5 h-5" />
                        <span className="text-[10px] font-bold">{lang.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4">Set Difficulty</label>
                  <div className="flex gap-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDiff(diff)}
                        className={cn(
                          "flex-1 py-3 rounded-2xl border text-sm font-bold transition-all",
                          selectedDiff === diff 
                            ? "bg-cyan-500/10 border-cyan-500 text-white" 
                            : "bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-700"
                        )}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <Button size="lg" className="w-full h-14 text-lg" onClick={handleStartChallenge}>
                    Generate Problem
                  </Button>
                  <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-2">
                    <ShieldAlert className="w-3 h-3" /> Opponents will be matched automatically or share link.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};