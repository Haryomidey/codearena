import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, Code2, Zap, Share2, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

export const Results: React.FC = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const result = {
    matchId: matchId || 'M-8821',
    winner: 'You',
    duration: '14:22',
    language: 'JavaScript',
    difficulty: 'Medium',
    problem: 'Longest Substring Without Repeating Characters',
    ratingChange: +42,
    newRating: 1540,
    players: [
      { name: 'You', score: 98, time: '12:05', status: 'Winner' },
      { name: 'AliceCode', score: 74, time: '14:22', status: 'Loser' }
    ]
  };

  return (
    <div className="container mx-auto px-6 pt-24 pb-12 max-w-4xl">
      <Button variant="ghost" className="mb-8" onClick={() => navigate('/dashboard')}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-500 rounded-2xl shadow-xl shadow-indigo-500/20 mb-6 rotate-3">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black mb-2 tracking-tight">VICTORY</h1>
        <p className="text-gray-400 text-lg">You dominated the arena against AliceCode</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/10 rounded-xl mx-auto mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-indigo-400">+{result.ratingChange}</p>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Rating Change</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-cyan-500/10 rounded-xl mx-auto mb-4">
            <Clock className="w-5 h-5 text-cyan-500" />
          </div>
          <p className="text-2xl font-bold">{result.duration}</p>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Total Time</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 rounded-xl mx-auto mb-4">
            <Zap className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold">98%</p>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Efficiency</p>
        </Card>
      </div>

      <Card className="mb-8 p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Code2 className="w-6 h-6 text-indigo-500" /> Score Breakdown
        </h3>
        <div className="space-y-8">
          {result.players.map((player, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold flex items-center gap-2">
                  {player.name}
                  {player.status === 'Winner' && <Badge variant="success">Winner</Badge>}
                </span>
                <span className="text-sm font-mono text-gray-400">{player.score} pts</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${player.score}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={cn(
                    "h-full rounded-full",
                    player.status === 'Winner' ? "bg-indigo-500" : "bg-gray-600"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1 h-12" onClick={() => navigate('/battle/room-123')}>
          Next Match
        </Button>
        <Button variant="outline" className="flex-1 h-12">
          <Share2 className="w-4 h-4 mr-2" /> Share Result
        </Button>
      </div>
    </div>
  );
};