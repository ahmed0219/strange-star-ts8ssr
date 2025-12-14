import React, { useState, useEffect } from "react";
import { GameView, UserProfile, Block } from "./types";
import { INITIAL_PROFILE, BADGES } from "./constants";
import { StatsPanel } from "./components/StatsPanel";
import { MiningRig } from "./components/MiningRig";
import { BlockChainVisualizer } from "./components/BlockChainVisualizer";
import { Leaderboard } from "./components/Leaderboard";
import { LayoutDashboard, Pickaxe, BarChart3, Database } from "lucide-react";
import SHA256 from "crypto-js/sha256"; // We'll assume usage or mock hash

const App: React.FC = () => {
  const [view, setView] = useState<GameView>(GameView.MINING);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [chain, setChain] = useState<Block[]>([]);

  // Simple hash function for visual effect (not real secure implementation)
  const calculateHash = (
    index: number,
    prevHash: string,
    timestamp: string,
    data: string
  ) => {
    return SHA256(index + prevHash + timestamp + data).toString();
  };

  const handleMineBlock = (topic: string, difficulty: string) => {
    // 1. Update Chain
    const newBlockIndex = chain.length;
    const prevHash =
      chain.length > 0 ? chain[chain.length - 1].hash : "00000000000000000000";
    const timestamp = new Date().toISOString();
    const data = `Learned: ${topic}`;
    const hash = calculateHash(newBlockIndex, prevHash, timestamp, data);

    const newBlock: Block = {
      index: newBlockIndex,
      timestamp,
      data,
      prevHash,
      hash,
      difficulty: difficulty as any,
    };

    setChain([...chain, newBlock]);

    // 2. Update Profile (Gamification)
    setProfile((prev) => {
      const xpGain =
        difficulty === "Hard" ? 100 : difficulty === "Medium" ? 50 : 25;
      let newExp = prev.exp + xpGain;
      let newLevel = prev.level;
      let nextLevelExp = prev.expToNextLevel;

      // Level Up Logic
      if (newExp >= nextLevelExp) {
        newLevel += 1;
        newExp = newExp - nextLevelExp;
        nextLevelExp = Math.floor(nextLevelExp * 1.5);
      }

      const newBlocksMined = prev.blocksMined + 1;
      const newHashRate = prev.hashRate + (difficulty === "Hard" ? 5 : 2); // Hashrate increases with success

      // Check Badge Unlocks
      const currentBadges = new Set(prev.badges);
      BADGES.forEach((badge) => {
        if (
          !currentBadges.has(badge.id) &&
          badge.condition({
            ...prev,
            blocksMined: newBlocksMined,
            level: newLevel,
            hashRate: newHashRate,
          })
        ) {
          currentBadges.add(badge.id);
          // In a real app, trigger a toast notification here
        }
      });

      return {
        ...prev,
        level: newLevel,
        exp: newExp,
        expToNextLevel: nextLevelExp,
        blocksMined: newBlocksMined,
        hashRate: newHashRate,
        badges: Array.from(currentBadges),
      };
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-dark-bg text-gray-200 font-sans">
      {/* Mobile Navigation (Simple top bar) */}
      <div className="lg:hidden p-4 bg-dark-card border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold font-mono text-neon-blue">
          BLOCKQUEST
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setView(GameView.MINING)}
            className={
              view === GameView.MINING ? "text-neon-blue" : "text-gray-500"
            }
          >
            <Pickaxe />
          </button>
          <button
            onClick={() => setView(GameView.LEADERBOARD)}
            className={
              view === GameView.LEADERBOARD ? "text-neon-blue" : "text-gray-500"
            }
          >
            <BarChart3 />
          </button>
        </div>
      </div>

      {/* Main Navigation Sidebar (Desktop) */}
      <div className="hidden lg:flex flex-col w-64 bg-dark-card border-r border-gray-800 p-4">
        <div className="mb-10 px-2 mt-4">
          <h1 className="text-2xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
            BLOCK<span className="text-white">QUEST</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-mono">
            v1.0.0 // NODE_ACTIVE
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setView(GameView.MINING)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              view === GameView.MINING
                ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            <Pickaxe className="w-5 h-5" />
            <span className="font-bold">Mining Rig</span>
          </button>
          <button
            onClick={() => setView(GameView.CHAIN)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              view === GameView.CHAIN
                ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            <Database className="w-5 h-5" />
            <span className="font-bold">My Blockchain</span>
          </button>
          <button
            onClick={() => setView(GameView.LEADERBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              view === GameView.LEADERBOARD
                ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-bold">Network Status</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <div className="text-xs text-gray-600 font-mono text-center">
            Powered by Gemini AI
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#131520] to-dark-bg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-50"></div>

        <div className="p-4 lg:p-10 max-w-6xl mx-auto">
          {view === GameView.MINING && (
            <div className="animate-in fade-in duration-500">
              <MiningRig
                onMineBlock={handleMineBlock}
                userHashRate={profile.hashRate}
              />
              <div className="mt-12">
                <h3 className="text-gray-400 font-mono text-sm mb-4">
                  LATEST BLOCK CONFIRMATIONS
                </h3>
                <BlockChainVisualizer chain={chain} />
              </div>
            </div>
          )}

          {view === GameView.CHAIN && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-bold text-white mb-6 font-mono">
                Your Immutable Ledger
              </h2>
              <BlockChainVisualizer chain={chain} />
              <div className="mt-8 text-gray-400 text-sm max-w-2xl">
                Each block represents a validated knowledge transaction. The
                hash links it to the previous block, creating a secure chain of
                your learning progress.
              </div>
            </div>
          )}

          {view === GameView.LEADERBOARD && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Leaderboard />
            </div>
          )}
        </div>
      </main>

      {/* Right Panel (Stats) - Hidden on mobile, visible on LG */}
      <aside className="hidden lg:block h-screen sticky top-0">
        <StatsPanel profile={profile} />
      </aside>

      {/* Mobile Stats Drawer could go here, omitting for brevity */}
    </div>
  );
};

export default App;
