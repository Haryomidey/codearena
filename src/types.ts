export interface User {
  id: string;
  username: string;
  avatar: string;
  rank: number;
  rating: number;
  isFollowing?: boolean;
  stats: {
    wins: number;
    losses: number;
    draws: number;
  };
  matchHistory?: MatchSummary[];
}

export interface MatchSummary {
  id: string;
  opponent: string;
  status: 'Win' | 'Loss' | 'Draw';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timestamp: string;
}

export interface Player extends User {
  currentCode: string;
  isReady: boolean;
  cursorPosition?: { line: number; column: number };
  typingStatus: 'idle' | 'typing';
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  type: 'chat' | 'system' | 'spectator';
}

export interface MatchProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  initialCode: string;
  testCases: TestCase[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

export interface Room {
  id: string;
  name: string;
  players: [Player, Player | null];
  spectators: User[];
  problem?: MatchProblem;
  status: 'waiting' | 'starting' | 'in-progress' | 'finished';
  timer: number;
  winnerId?: string;
  language: 'javascript' | 'typescript' | 'python' | 'cpp';
}

export interface MatchResult {
  matchId: string;
  winnerId: string;
  players: [Player, Player];
  score: {
    player1: number;
    player2: number;
  };
  duration: number;
  timestamp: number;
  language: string;
  problemTitle: string;
}
