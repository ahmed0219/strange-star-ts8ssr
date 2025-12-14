import { Badge, UserProfile } from "./types";
import { Award, Zap, Shield, Database, Cpu, Globe } from "lucide-react";

export const INITIAL_PROFILE: UserProfile = {
  name: "Node_Initiate_01",
  avatarId: "robot",
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  blocksMined: 0,
  hashRate: 10, // MH/s
  badges: [],
};

export const TOPICS = [
  {
    id: "basics",
    name: "Blockchain Basics",
    icon: Database,
    difficulty: "Easy",
  },
  {
    id: "consensus",
    name: "Consensus Mechanisms",
    icon: Shield,
    difficulty: "Medium",
  },
  {
    id: "crypto",
    name: "Cryptography & Hashing",
    icon: Cpu,
    difficulty: "Hard",
  },
  {
    id: "smart_contracts",
    name: "Smart Contracts",
    icon: Zap,
    difficulty: "Medium",
  },
  { id: "defi", name: "DeFi & Web3", icon: Globe, difficulty: "Hard" },
];

export const BADGES: Badge[] = [
  {
    id: "genesis",
    name: "Genesis Block",
    description: "Mined your first block (Answered 1st question correctly).",
    icon: "cube",
    rarity: "common",
    condition: (p) => p.blocksMined >= 1,
  },
  {
    id: "miner_5",
    name: "Proof of Work",
    description: "Mined 5 blocks successfully.",
    icon: "pickaxe",
    rarity: "common",
    condition: (p) => p.blocksMined >= 5,
  },
  {
    id: "hash_master",
    name: "Hash Master",
    description: "Reach 50 MH/s Hash Rate (Streak of 5).",
    icon: "zap",
    rarity: "rare",
    condition: (p) => p.hashRate >= 50,
  },
  {
    id: "whale",
    name: "The Whale",
    description: "Reach Level 5.",
    icon: "crown",
    rarity: "legendary",
    condition: (p) => p.level >= 5,
  },
];

export const MOCK_LEADERBOARD = [
  {
    id: "1",
    name: "Satoshi_N",
    blocksMined: 21000,
    hashRate: "9000 TH/s",
    avatarColor: "text-orange-500",
  },
  {
    id: "2",
    name: "Vitalik_B",
    blocksMined: 15400,
    hashRate: "5000 GH/s",
    avatarColor: "text-purple-500",
  },
  {
    id: "3",
    name: "Ada_L",
    blocksMined: 8200,
    hashRate: "2000 GH/s",
    avatarColor: "text-blue-500",
  },
  {
    id: "4",
    name: "Gavin_W",
    blocksMined: 6000,
    hashRate: "1500 GH/s",
    avatarColor: "text-pink-500",
  },
  {
    id: "5",
    name: "Node_Breaker",
    blocksMined: 120,
    hashRate: "50 MH/s",
    avatarColor: "text-red-500",
  },
];
