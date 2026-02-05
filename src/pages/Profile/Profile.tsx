import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Settings, 
  ExternalLink, 
  Edit3, 
  Swords, 
  Users, 
  UserCheck, 
  UserPlus, 
  Search,
  Filter,
  CheckCircle2,
  Award
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

export const Profile: React.FC = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState<'history' | 'followers' | 'following'>('history');
  const [searchQuery, setSearchQuery] = useState('');
  
  const user = {
    username: username || 'johndoe',
    rating: 1540,
    rank: 124,
    followersCount: 840,
    followingCount: 124,
    winRate: '68%',
    battles: 152,
    location: 'San Francisco, CA',
    joined: 'Jan 2023',
    history: [
      { id: '1', opponent: 'AliceCode', status: 'Win', difficulty: 'Medium', timestamp: '2h ago', points: '+42' },
      { id: '2', opponent: 'DevGuru', status: 'Loss', difficulty: 'Hard', timestamp: '5h ago', points: '-18' },
      { id: '3', opponent: 'BitKnight', status: 'Win', difficulty: 'Easy', timestamp: '1d ago', points: '+12' },
    ]
  };

  const mockFollowers = [
    { username: 'AliceCode', rating: 2100, isFollowing: true, rank: 42 },
    { username: 'DevGuru', rating: 1950, isFollowing: false, rank: 88 },
    { username: 'CodeNinja', rating: 1820, isFollowing: true, rank: 112 },
    { username: 'ByteSlayer', rating: 1450, isFollowing: false, rank: 304 },
    { username: 'BugHunter', rating: 1680, isFollowing: true, rank: 156 },
    { username: 'StackKing', rating: 2420, isFollowing: false, rank: 12 },
  ];

  const mockFollowing = [
    { username: 'AlgorithmKing', rating: 2840, isFollowing: true, rank: 1 },
    { username: 'PixelSlayer', rating: 2710, isFollowing: true, rank: 2 },
    { username: 'AliceCode', rating: 2100, isFollowing: true, rank: 42 },
    { username: 'CodeNinja', rating: 1820, isFollowing: true, rank: 112 },
  ];

  const filteredFollowers = mockFollowers.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFollowing = mockFollowing.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()));

  const UserListItem: React.FC<{ user: any }> = ({ user: u }) => (
    <Card className="p-4 flex items-center justify-between border-gray-800/50 hover:border-indigo-500/30 transition-all group">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img src={`https://picsum.photos/seed/${u.username}/48/48`} className="w-11 h-11 rounded-xl shadow-md border border-gray-800" alt="" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-gray-950 rounded-full" />
        </div>
        <div>
          <Link to={`/profile/${u.username}`} className="font-bold text-sm hover:text-indigo-400 transition-colors flex items-center gap-2">
            {u.username}
            {u.rank <= 50 && <Award className="w-3 h-3 text-amber-500" />}
          </Link>
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-0.5">{u.rating} RP • RANK #{u.rank}</p>
        </div>
      </div>
      <Button 
        variant={u.isFollowing ? "outline" : "primary"} 
        size="sm" 
        className="h-9 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest transition-all"
      >
        {u.isFollowing ? (
          <><UserCheck className="w-3.5 h-3.5 mr-2" /> Following</>
        ) : (
          <><UserPlus className="w-3.5 h-3.5 mr-2" /> Follow</>
        )}
      </Button>
    </Card>
  );

  return (
    <div className="container mx-auto px-6 pt-24 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Bio Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Badge variant="outline" className="text-[8px] border-gray-800 bg-gray-950/50">PRO ACCESS</Badge>
            </div>
            
            <div className="w-32 h-32 rounded-3xl border-2 border-indigo-500/20 p-1.5 mb-6 rotate-2 bg-gray-900 shadow-2xl">
              <img src={`https://picsum.photos/seed/${user.username}/200/200`} className="w-full h-full rounded-2xl object-cover" alt="" />
            </div>
            
            <h1 className="text-2xl font-black uppercase tracking-tight mb-1 flex items-center gap-2">
              {user.username}
              <CheckCircle2 className="w-5 h-5 text-indigo-500 fill-indigo-500/10" />
            </h1>
            <p className="text-indigo-400 font-mono text-[10px] uppercase tracking-widest font-black mb-8 px-4 py-1 bg-indigo-500/5 rounded-full border border-indigo-500/10">ELITE COMPETITOR • #{user.rank}</p>
            
            <div className="grid grid-cols-2 gap-px w-full mb-8 bg-gray-800/50 border border-gray-800/50 rounded-2xl overflow-hidden">
              <button onClick={() => setActiveTab('followers')} className="bg-gray-950 p-5 text-center group hover:bg-gray-900 transition-colors">
                <p className="text-xl font-black group-hover:text-indigo-400 transition-colors">{user.followersCount}</p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Followers</p>
              </button>
              <button onClick={() => setActiveTab('following')} className="bg-gray-950 p-5 text-center group hover:bg-gray-900 transition-colors">
                <p className="text-xl font-black group-hover:text-indigo-400 transition-colors">{user.followingCount}</p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Following</p>
              </button>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 mb-8">
               <div className="bg-gray-900/40 p-3 rounded-2xl border border-gray-800/50">
                 <p className="text-xs font-black text-white">{user.winRate}</p>
                 <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Win Rate</p>
               </div>
               <div className="bg-gray-900/40 p-3 rounded-2xl border border-gray-800/50">
                 <p className="text-xs font-black text-white">{user.battles}</p>
                 <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Duels</p>
               </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button variant="outline" className="w-full rounded-2xl h-12 border-gray-800 text-gray-300 hover:text-white">
                <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
              <Button variant="ghost" className="w-full text-gray-500 hover:text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                <Settings className="w-3.5 h-3.5 mr-2 inline" /> Account Settings
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[10px] font-black mb-5 flex items-center gap-2 text-gray-500 uppercase tracking-widest">
              <Award className="w-4 h-4 text-amber-500" /> Achievements
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-amber-500/5 border-amber-500/20 text-amber-500">10-Win Streak</Badge>
              <Badge variant="outline" className="bg-indigo-500/5 border-indigo-500/20 text-indigo-500">Early Adopter</Badge>
              <Badge variant="outline" className="bg-cyan-500/5 border-cyan-500/20 text-cyan-500">Logic Master</Badge>
            </div>
          </Card>
        </div>

        {/* Right Column: Tabbed Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex border-b border-gray-800 bg-gray-950/20 rounded-t-3xl overflow-hidden shrink-0">
            {[
              { id: 'history', label: 'Match History', icon: History },
              { id: 'followers', label: 'Followers', icon: Users },
              { id: 'following', label: 'Following', icon: UserCheck }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchQuery('');
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-6 py-5 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all",
                  activeTab === tab.id ? "text-indigo-500 border-indigo-500 bg-indigo-500/5" : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'history' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                {user.history.map(match => (
                  <Card key={match.id} className="p-6 flex items-center justify-between border-gray-800/50 hover:bg-gray-900/40 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                        match.status === 'Win' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                      )}>
                        <Swords size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm flex items-center gap-2">
                          vs {match.opponent}
                          <Badge variant="outline" className="text-[8px] h-4 border-gray-800 px-1.5">{match.difficulty}</Badge>
                        </h4>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">{match.timestamp} • Ranked Duel</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={cn("text-xs font-black", match.status === 'Win' ? "text-emerald-500" : "text-rose-500")}>{match.status}</p>
                        <p className="text-[10px] font-mono text-gray-600">{match.points} RP</p>
                      </div>
                      <Button variant="ghost" size="sm" className="hidden sm:flex h-10 w-10 p-0 items-center justify-center border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                        <ExternalLink size={16} className="text-gray-500" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {(activeTab === 'followers' || activeTab === 'following') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab}...`} 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <Button variant="outline" className="rounded-2xl border-gray-800 h-12 w-12 p-0 flex items-center justify-center">
                    <Filter className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(activeTab === 'followers' ? filteredFollowers : filteredFollowing).length > 0 ? (
                    (activeTab === 'followers' ? filteredFollowers : filteredFollowing).map(u => (
                      <UserListItem key={u.username} user={u} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 text-gray-700">
                        <Users size={32} />
                      </div>
                      <p className="text-gray-500 text-sm font-medium">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};