export interface UserProfile {
  name: string;
  avatarId: string; // Just an icon name or color code
  level: number;
  exp: number;
  expToNextLevel: number;
  blocksMined: number; // Total correct answers
  hashRate: number; // Simulated "score" multiplier based on streak
  badges: string[]; // IDs of unlocked badges
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "legendary";
  condition: (profile: UserProfile) => boolean;
}

export interface Block {
  index: number;
  timestamp: string;
  data: string; // The concept learned
  prevHash: string;
  hash: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export enum GameView {
  DASHBOARD = "DASHBOARD",
  MINING = "MINING", // The quiz interface
  LEADERBOARD = "LEADERBOARD",
  PROFILE = "PROFILE",
  CHAIN = "CHAIN", // Visualizing the blockchain
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  blocksMined: number;
  hashRate: string;
  avatarColor: string;
}
