import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Timer as TimerIcon, 
  Flag,
  Zap,
  Terminal,
  Swords,
  EyeOff,
  LogOut,
  BrainCircuit,
  Loader2,
  Users,
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

const LANGUAGE_CONFIGS: Record<string, { initial: string, monaco: string }> = {
  javascript: {
    initial: `function lengthOfLongestSubstring(s) {\n  // Find the length of the longest substring without repeating characters\n  let maxLen = 0;\n  // Your code here...\n  \n  return maxLen;\n}`,
    monaco: 'javascript'
  },
  typescript: {
    initial: `function lengthOfLongestSubstring(s: string): number {\n  let maxLen: number = 0;\n  // Your code here...\n\n  return maxLen;\n}`,
    monaco: 'typescript'
  },
  python: {
    initial: `def length_of_longest_substring(s: str) -> int:\n    max_len = 0\n    # Your code here...\n    \n    return max_len`,
    monaco: 'python'
  }
};

export const BattleRoom: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isSpectator = location.pathname.includes('/spectate/');
  
  const [timeLeft, setTimeLeft] = useState(1200);
  const [playerCode, setPlayerCode] = useState(LANGUAGE_CONFIGS.javascript.initial);
  const [opponentCode, setOpponentCode] = useState(`function lengthOfLongestSubstring(s) {\n  // Opponent is coding...\n  let set = new Set();\n}`);
  
  // Battle Flow States
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [opponentSubmitted, setOpponentSubmitted] = useState(false);
  const [isJudging, setIsJudging] = useState(false);
  const [judgingStatus, setJudgingStatus] = useState('');
  
  const [activeTab, setActiveTab] = useState<'problem' | 'chat'>('problem');
  const [mobileView, setMobileView] = useState<'editor' | 'opponent' | 'info'>('editor');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ArenaBot', text: isSpectator ? 'Spectating mode active. You see all code.' : 'Duel started. Fog of war active on opponent editor.', type: 'system' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Mock real-time opponent code update (visual only)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!opponentSubmitted) {
        setOpponentCode(prev => prev + (Math.random() > 0.5 ? '\n  ' : ''));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [opponentSubmitted]);

  // Simulate opponent submitting after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpponentSubmitted(true);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'ArenaBot', 
        text: '⚠️ PLAYER 2 HAS SUBMITTED! Match will conclude when you submit.', 
        type: 'system' 
      }]);
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const performAIJudging = useCallback(async () => {
    setIsJudging(true);
    setJudgingStatus('Accessing Neural Judge...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setJudgingStatus('Evaluating Correctness...');
      await new Promise(r => setTimeout(r, 1500));
      setJudgingStatus('Analyzing Time Complexity...');
      await new Promise(r => setTimeout(r, 1500));
      setJudgingStatus('Calculating Final Scores...');

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Act as a senior software engineer judge in a coding battle.
        Problem: Longest Substring Without Repeating Characters.
        
        Player A Code: ${playerCode}
        Player B Code: ${opponentCode}
        
        Evaluate both on:
        1. Correctness (Does it solve the problem?)
        2. Performance (Time/Space complexity)
        3. Readability & Best Practices.
        
        Assign a winner ("Player A" or "Player B").
        Assign scores out of 100 for each.
        Provide a concise reason for the verdict.
        
        Return ONLY valid JSON in this format:
        { "winner": "Player A", "scoreA": 95, "scoreB": 80, "reason": "Player A used a sliding window O(n) approach whereas Player B had a nested loop O(n^2) approach." }`,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 0 } 
        }
      });

      const result = JSON.parse(response.text || '{}');
      navigate(`/results/${roomId}`, { state: { result, playerCode, opponentCode } });
    } catch (err) {
      console.error("Judging Error:", err);
      // Fallback for demo if API fails
      navigate(`/results/${roomId}`, { state: { error: true } });
    } finally {
      setIsJudging(false);
    }
  }, [playerCode, opponentCode, roomId, navigate]);

  const handleSubmit = () => {
    if (isSpectator || hasSubmitted) return;
    setHasSubmitted(true);
    setMessages(prev => [...prev, { id: 's1', sender: 'ArenaBot', text: 'You have submitted your solution. Waiting for judgment...', type: 'system' }]);
    
    // In this simulation, if opponent already submitted, judge now. 
    // If not, wait for them (simulated by the useEffect that triggers opponentSubmitted)
    if (opponentSubmitted) {
      performAIJudging();
    }
  };

  const handleSurrender = () => {
    if (isSpectator) return;
    if (window.confirm('Are you sure you want to SURRENDER? This will be recorded as a loss.')) {
      navigate(`/results/${roomId}?forfeit=true&winner=Opponent`);
    }
  };

  const handleSendChat = () => {
    if (!inputMsg.trim()) return;
    const newMsg = { id: Date.now().toString(), sender: 'You', text: inputMsg, type: isSpectator ? 'spectator' : 'chat' };
    setMessages([...messages, newMsg as any]);
    setInputMsg('');
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "'Fira Code', monospace",
    renderLineHighlight: 'all',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16, bottom: 16 }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden pt-16">
      {/* Judging Overlay */}
      <AnimatePresence>
        {isJudging && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-gray-950/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
          >
            <BrainCircuit className="w-20 h-20 text-indigo-500 animate-pulse mb-6" />
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Analyzing Duels</h2>
            <p className="text-indigo-400 font-mono text-sm tracking-widest animate-bounce">{judgingStatus}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-14 shrink-0 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <Badge variant={isSpectator ? "outline" : "primary"}>
            {isSpectator ? 'SPECTATOR' : 'RANKED COMPETITOR'}
          </Badge>
          <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-xl border border-gray-800 font-mono text-xs">
            <TimerIcon className={cn("w-4 h-4", timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-indigo-500")} />
            <span className={cn(timeLeft < 60 && "text-rose-500 font-bold")}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Player 1</p>
              <p className="text-xs font-black">{isSpectator ? 'AlphaDev' : 'You'}</p>
            </div>
            <img src="https://picsum.photos/seed/p1/40/40" className="w-9 h-9 rounded-xl border-2 border-indigo-500 shadow-lg shadow-indigo-500/10" alt="" />
            <Swords className="w-5 h-5 text-gray-700 mx-1" />
            <img src="https://picsum.photos/seed/p2/40/40" className="w-9 h-9 rounded-xl border-2 border-gray-800" alt="" />
            <div className="text-left">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Player 2</p>
              <p className="text-xs font-black">Opponent</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {isSpectator ? (
            <Button variant="outline" size="sm" className="rounded-xl border-gray-700 hover:bg-gray-800" onClick={() => navigate('/dashboard')}>
              <LogOut className="w-4 h-4 mr-2" /> Exit
            </Button>
          ) : (
            <>
              <Button variant="danger" size="sm" className="rounded-xl" onClick={handleSurrender} disabled={hasSubmitted}>
                <Flag className="w-4 h-4 mr-2" /> Surrender
              </Button>
              <Button variant="primary" size="sm" className="rounded-xl px-6" onClick={handleSubmit} disabled={hasSubmitted}>
                {hasSubmitted ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                {hasSubmitted ? 'Submitted' : 'Submit'}
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Grid UI */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Mobile Sub-Navigation */}
        <div className="flex md:hidden bg-gray-900 border-b border-gray-800 h-12 shrink-0">
          <button onClick={() => setMobileView('editor')} className={cn("flex-1 text-[10px] font-black uppercase tracking-widest transition-all", mobileView === 'editor' ? "text-indigo-400 bg-indigo-500/10 border-b-2 border-indigo-500" : "text-gray-500")}>Workspace</button>
          <button onClick={() => setMobileView('info')} className={cn("flex-1 text-[10px] font-black uppercase tracking-widest transition-all", mobileView === 'info' ? "text-indigo-400 bg-indigo-500/10 border-b-2 border-indigo-500" : "text-gray-500")}>Info & Chat</button>
          <button onClick={() => setMobileView('opponent')} className={cn("flex-1 text-[10px] font-black uppercase tracking-widest transition-all", mobileView === 'opponent' ? "text-indigo-400 bg-indigo-500/10 border-b-2 border-indigo-500" : "text-gray-500")}>Opponent</button>
        </div>

        {/* Left: Player Workspace */}
        <section className={cn("flex-1 flex flex-col border-r border-gray-800", mobileView === 'editor' ? "flex" : "hidden md:flex")}>
          <div className="h-9 bg-gray-950 flex items-center px-4 border-b border-gray-800 justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Main.js</span>
            </div>
            {hasSubmitted && <Badge variant="success" className="text-[8px] h-5">Verified Submission</Badge>}
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%" theme="vs-dark" language="javascript"
              value={playerCode} 
              onChange={v => !isSpectator && !hasSubmitted && setPlayerCode(v || '')}
              options={{ ...editorOptions, readOnly: isSpectator || hasSubmitted }}
            />
          </div>
        </section>

        {/* Middle: Problem/Chat Info Panel */}
        <section className={cn("w-full md:w-[320px] lg:w-[400px] flex flex-col bg-gray-900/10 border-x border-gray-800 shrink-0", mobileView === 'info' ? "flex" : "hidden md:flex")}>
          <div className="flex border-b border-gray-800 bg-gray-950 shrink-0">
            <button key="prob" onClick={() => setActiveTab('problem')} className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2", activeTab === 'problem' ? "text-indigo-500 border-indigo-500 bg-indigo-500/5" : "text-gray-500 border-transparent")}>Challenge</button>
            <button key="chat" onClick={() => setActiveTab('chat')} className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2", activeTab === 'chat' ? "text-indigo-500 border-indigo-500 bg-indigo-500/5" : "text-gray-500 border-transparent")}>Arena Chat</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
            <AnimatePresence mode="wait">
              {activeTab === 'problem' ? (
                <motion.div key="p" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black tracking-tight mb-2">Longest Substring Without Repeating Characters</h3>
                    <Badge variant="warning">ELO 1400 • Medium</Badge>
                  </div>
                  <div className="prose prose-invert text-sm text-gray-400 leading-relaxed">
                    <p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
                    <div className="bg-black/50 p-4 rounded-xl border border-gray-800 font-mono text-[11px] my-4">
                      <p className="text-gray-500">// Example 1</p>
                      <p><span className="text-indigo-400">Input:</span> s = "abcabcbb"</p>
                      <p><span className="text-indigo-400">Output:</span> 3</p>
                      <p className="text-gray-500 mt-2">// Explanation: The answer is "abc", with the length of 3.</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Constraints</h4>
                    <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                      <li>0 ≤ s.length ≤ 5 * 10^4</li>
                      <li>s consists of English letters, digits, symbols and spaces.</li>
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="c" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="h-full flex flex-col">
                  <div className="flex-1 space-y-4 mb-4 overflow-y-auto pr-1">
                    {messages.map(m => (
                      <div key={m.id} className={cn("flex flex-col", m.sender === 'You' ? "items-end" : "items-start")}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                           <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">{m.sender}</span>
                           {m.type === 'system' && <div className="w-1 h-1 rounded-full bg-indigo-500" />}
                        </div>
                        <div className={cn(
                          "px-4 py-2.5 rounded-2xl text-xs max-w-[95%] leading-relaxed",
                          m.type === 'system' ? "bg-indigo-500/5 border border-indigo-500/20 text-indigo-300 w-full text-center italic" :
                          m.sender === 'You' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10" : "bg-gray-800 text-gray-200 border border-gray-700"
                        )}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-auto pt-4 shrink-0">
                    <input 
                      value={inputMsg} 
                      onChange={e => setInputMsg(e.target.value)} 
                      onKeyDown={e => e.key === 'Enter' && handleSendChat()} 
                      className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-3.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all pr-12" 
                      placeholder={isSpectator ? "Talk to other viewers..." : "Chat with opponent..."}
                    />
                    <button onClick={handleSendChat} className="absolute right-3 top-[calc(50%+8px)] -translate-y-1/2 text-indigo-500 hover:text-indigo-400 p-2">
                      <Send size={18}/>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Right: Opponent View / Viewer View */}
        <section className={cn("flex-1 flex flex-col bg-black/30 relative", mobileView === 'opponent' ? "flex" : "hidden md:flex")}>
          <div className="h-9 bg-gray-950 flex items-center px-4 border-b border-gray-800 justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Opponent Stream</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", opponentSubmitted ? "bg-gray-500" : "bg-emerald-500 animate-pulse")} />
                <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">
                  {opponentSubmitted ? 'Submitted' : 'Live'}
                </span>
              </div>
              {opponentSubmitted && <Badge variant="success" className="text-[8px] h-5">Ready for Judging</Badge>}
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            {/* Fog of War logic for competitors */}
            {!isSpectator && (
              <div className="absolute inset-0 z-20 backdrop-blur-2xl bg-gray-950/70 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
                <div className="p-4 bg-rose-500/10 rounded-full mb-6">
                  <EyeOff className="w-12 h-12 text-rose-500/40" />
                </div>
                <h4 className="font-black uppercase tracking-widest text-sm mb-2 text-white">Fog of War Active</h4>
                <p className="text-gray-500 text-xs max-w-[240px] leading-relaxed">
                  Competitor code is obfuscated to prevent plagiarism during ranked matches.
                </p>
                <div className="mt-8 px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-2xl flex items-center gap-3">
                   <div className="flex flex-col items-start">
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Real-time status</span>
                     <span className="text-xs font-mono text-gray-400">{opponentSubmitted ? 'Finished' : 'Typing logic...'}</span>
                   </div>
                </div>
              </div>
            )}
            
            <Editor
              height="100%" theme="vs-dark" language="javascript"
              value={opponentCode} 
              options={{ ...editorOptions, readOnly: true }}
            />
          </div>
        </section>
      </main>

      {/* Responsive Footer */}
      <footer className="h-9 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-6 shrink-0 z-50 overflow-hidden">
        <div className="flex gap-6 items-center">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest hidden sm:inline">Connection: Stable</span>
           </div>
           <div className="flex items-center gap-2">
             <Users className="w-3 h-3 text-gray-600" />
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">124 Viewers</span>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest font-mono">Arena Node: EU-WEST-4</span>
          <div className="h-4 w-px bg-gray-800" />
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Ranked Session</span>
        </div>
      </footer>
    </div>
  );
};