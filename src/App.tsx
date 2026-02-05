import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider } from '@/providers/SocketProvider';
import { PageLayout } from '@/components/layout/PageLayout';
import { Home } from '@/pages/Home/Home';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { BattleRoom } from '@/pages/BattleRoom/BattleRoom';
import { Profile } from '@/pages/Profile/Profile';
import { Leaderboard } from '@/pages/Leaderboard/Leaderboard';
import { Results } from '@/pages/Results/Results';

const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="pt-24 px-6 text-center">
    <h1 className="text-3xl font-bold">{name} Page</h1>
    <p className="text-gray-400 mt-2">Coming soon to the Arena.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="results/:matchId" element={<Results />} />
            <Route path="login" element={<PlaceholderPage name="Login" />} />
            <Route path="register" element={<PlaceholderPage name="Register" />} />
          </Route>

          <Route path="/battle/:roomId" element={<BattleRoom />} />
          <Route path="/spectate/:roomId" element={<BattleRoom />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;