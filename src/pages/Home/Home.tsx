import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Users, Zap, Terminal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pt-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <Zap className="w-3 h-3" />
            V2.0 is now live with AI judging
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Code Fast. Duel Hard. <br />
            <span className="text-indigo-500 italic">Conquer the Arena.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate competitive platform for developers. Duel in real-time, 
            prove your logic, and climb the global leaderboards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" onClick={() => navigate('/dashboard')}>
              Enter Arena
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" onClick={() => navigate('/leaderboard')}>
              View Rankings
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 text-left group">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <Terminal className="w-6 h-6 text-indigo-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Duels</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Compete 1v1 in real-time. See every keystroke your opponent makes as you race to the solution.
              </p>
            </Card>

            <Card className="p-8 text-left group">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                <Code className="w-6 h-6 text-cyan-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Judging</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced AI analysis of code quality, performance, and logic to determine the true winner beyond just passing tests.
              </p>
            </Card>

            <Card className="p-8 text-left group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Users className="w-6 h-6 text-emerald-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Spectator Mode</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Watch top-tier matches live. Learn from the best and chat with other spectators in real-time.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};