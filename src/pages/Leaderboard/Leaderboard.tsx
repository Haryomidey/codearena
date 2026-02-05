import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Search, Filter, Users, Swords } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const TOP_PLAYERS = [
  { id: '1', username: 'AlgorithmKing', rating: 2840, rank: 1, wins: 450, winRate: '88%' },
  { id: '2', username: 'PixelSlayer', rating: 2710, rank: 2, wins: 392, winRate: '82%' },
  { id: '3', username: 'StackOverlord', rating: 2650, rank: 3, wins: 310, winRate: '79%' },
  { id: '4', username: 'johndoe', rating: 1420, rank: 1204, wins: 284, winRate: '75%' },
  { id: '5', username: 'BinaryBard', rating: 2380, rank: 5, wins: 260, winRate: '72%' },
  { id: '6', username: 'LogicWizard', rating: 2310, rank: 6, wins: 245, winRate: '70%' },
  { id: '7', username: 'ByteForce', rating: 2290, rank: 7, wins: 230, winRate: '68%' },
];

export const Leaderboard: React.FC = () => {
  const CURRENT_USER_NAME = "johndoe";

  return (
    <div className="container mx-auto px-6 pt-24 pb-12">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Hall of <span className="text-indigo-500">Legends</span></h1>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-medium">Ranked battle hierarchy of the world's most elite developers. Logic is the only currency here.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search players..." 
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <Button variant="outline" className="shrink-0 rounded-2xl h-12 w-12 p-0 flex items-center justify-center border-gray-800"><Filter className="w-5 h-5" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {TOP_PLAYERS.slice(0, 3).map((player, idx) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={cn(
              "p-8 text-center relative overflow-hidden border-2",
              idx === 0 ? "border-indigo-500/40 bg-indigo-500/5" : "border-gray-800/50"
            )}>
              {idx === 0 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-1 px-4 rounded-b-xl shadow-lg">
                  World Champion
                </div>
              )}
              <div className="absolute top-6 right-6 text-6xl font-black text-gray-800/10 select-none">#{player.rank}</div>
              <div className="relative w-24 h-24 rounded-3xl mx-auto mb-6 border-2 border-gray-800 p-1.5 rotate-3 hover:rotate-0 transition-transform duration-500 bg-gray-900">
                <img src={`https://picsum.photos/seed/${player.username}/100/100`} alt={player.username} className="w-full h-full rounded-2xl object-cover" />
                {idx === 0 && <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1.5 border-4 border-gray-950 shadow-xl"><Trophy className="w-4 h-4 text-white" /></div>}
              </div>
              <Link to={`/profile/${player.username}`} className="text-2xl font-black hover:text-indigo-400 transition-colors tracking-tight">{player.username}</Link>
              <div className="mt-6 flex flex-col items-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black">Performance Rating</span>
                <span className="text-4xl font-black text-white mt-1">{player.rating}</span>
              </div>
              <div className="mt-8 flex justify-center gap-3">
                {player.username !== CURRENT_USER_NAME ? (
                  <Button size="md" variant="primary" className="px-10 rounded-2xl font-black text-xs uppercase tracking-widest h-12">Follow</Button>
                ) : (
                  <Button size="md" variant="outline" className="px-10 rounded-2xl font-black text-xs uppercase tracking-widest h-12 border-indigo-500/30 text-indigo-400 bg-indigo-500/5" disabled>Your Rank</Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="overflow-hidden border-gray-800/50 rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="bg-gray-900/80 border-b border-gray-800">
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Rank</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Contender</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Rating</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Wins</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Interaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {TOP_PLAYERS.slice(3).map((player) => (
                <tr key={player.id} className={cn(
                  "hover:bg-gray-800/20 transition-all group",
                  player.username === CURRENT_USER_NAME ? "bg-indigo-500/5" : ""
                )}>
                  <td className="px-8 py-6 font-mono text-gray-500 text-sm font-bold">#{player.rank}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={`https://picsum.photos/seed/${player.username}/40/40`} className="w-10 h-10 rounded-xl border border-gray-800 shadow-sm" alt="" />
                      <Link to={`/profile/${player.username}`} className="font-bold text-sm hover:text-indigo-400 transition-colors flex items-center gap-2">
                        {player.username}
                        {player.username === CURRENT_USER_NAME && <Badge variant="primary" className="text-[8px] bg-indigo-500/10 h-4">YOU</Badge>}
                      </Link>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-indigo-400 text-base">{player.rating}</span>
                      <Swords className="w-3.5 h-3.5 text-gray-800" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-300">{player.wins} Battles</span>
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">{player.winRate} Win Rate</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {player.username !== CURRENT_USER_NAME && (
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 flex items-center gap-2 ml-auto h-10 px-4 rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all">
                        <Users className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">Follow</span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};