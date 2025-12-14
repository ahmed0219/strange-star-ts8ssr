import React from "react";
import { UserProfile, Badge } from "../types";
import { BADGES } from "../constants";
import { Shield, Zap, Box, Award } from "lucide-react";

interface Props {
  profile: UserProfile;
}

export const StatsPanel: React.FC<Props> = ({ profile }) => {
  const progressPercent = (profile.exp / profile.expToNextLevel) * 100;

  return (
    <div className="bg-dark-card w-full lg:w-80 border-l border-gray-800 p-6 flex flex-col h-full sticky top-0">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple p-[2px] shadow-[0_0_20px_rgba(188,19,254,0.4)]">
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.name}`}
              alt="Avatar"
              className="w-full h-full"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mt-4 font-mono">
          {profile.name}
        </h2>
        <div className="text-neon-blue text-sm font-mono">
          Level {profile.level} Node
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-dark-surface p-3 rounded border border-gray-800 text-center">
          <Box className="w-5 h-5 text-gray-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">
            {profile.blocksMined}
          </div>
          <div className="text-[10px] text-gray-500 uppercase">Blocks</div>
        </div>
        <div className="bg-dark-surface p-3 rounded border border-gray-800 text-center">
          <Zap className="w-5 h-5 text-neon-green mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{profile.hashRate}</div>
          <div className="text-[10px] text-gray-500 uppercase">MH/s</div>
        </div>
      </div>

      {/* EXP Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>EXP</span>
          <span>
            {profile.exp} / {profile.expToNextLevel}
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award className="w-4 h-4" /> Badges
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {BADGES.map((badge) => {
            const isUnlocked = profile.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`aspect-square rounded flex items-center justify-center border transition-all relative group
                            ${
                              isUnlocked
                                ? "bg-neon-purple/10 border-neon-purple text-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.2)]"
                                : "bg-gray-900 border-gray-800 text-gray-700 grayscale"
                            }`}
              >
                {badge.icon === "cube" && <Box className="w-5 h-5" />}
                {badge.icon === "pickaxe" && <Zap className="w-5 h-5" />}
                {badge.icon === "zap" && <Zap className="w-5 h-5" />}
                {badge.icon === "crown" && <Shield className="w-5 h-5" />}

                {/* Hover Tooltip */}
                <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-black border border-gray-700 rounded z-30 hidden group-hover:block pointer-events-none">
                  <p
                    className={`text-xs font-bold ${
                      isUnlocked ? "text-neon-pink" : "text-gray-500"
                    }`}
                  >
                    {badge.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {badge.description}
                  </p>
                  {!isUnlocked && (
                    <p className="text-[9px] text-red-400 mt-1">Locked</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
