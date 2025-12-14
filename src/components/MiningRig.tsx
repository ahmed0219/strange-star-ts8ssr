import React, { useState } from "react";
import { generateQuizQuestion } from "../services/geminiService";
import { QuizQuestion, UserProfile } from "../types";
import { Cpu, Terminal, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Props {
  onMineBlock: (topic: string, difficulty: string) => void;
  userHashRate: number;
}

const TOPICS = [
  { id: "basics", label: "Basics", difficulty: "Easy" },
  { id: "consensus", label: "Consensus", difficulty: "Medium" },
  { id: "smart_contracts", label: "Contracts", difficulty: "Hard" },
  { id: "security", label: "Security", difficulty: "Hard" },
];

export const MiningRig: React.FC<Props> = ({ onMineBlock, userHashRate }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

  const startMining = async (topicId: string, difficulty: string) => {
    setSelectedTopic(topicId);
    setLoading(true);
    setQuestion(null);
    setResult(null);
    setSelectedOption(null);

    const q = await generateQuizQuestion(topicId, difficulty);
    setQuestion(q);
    setLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (result !== null) return; // Prevent changing answer
    setSelectedOption(index);

    if (question && index === question.correctIndex) {
      setResult("correct");
      // Simulate mining delay based on hashrate? No, keep it instant for UI snap
      setTimeout(() => {
        onMineBlock(question.topic, "Medium");
      }, 1500);
    } else {
      setResult("incorrect");
    }
  };

  const resetRig = () => {
    setSelectedTopic(null);
    setQuestion(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 font-mono flex items-center gap-3">
            <Cpu className="text-neon-blue w-8 h-8" /> MINING RIG
          </h2>
          <p className="text-gray-400">
            Solve cryptographic puzzles (quizzes) to validate blocks.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 uppercase tracking-widest font-mono">
            Current Hashrate
          </div>
          <div className="text-2xl font-bold text-neon-green font-mono">
            {userHashRate} MH/s
          </div>
        </div>
      </div>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => startMining(t.id, t.difficulty)}
              className="group relative p-6 bg-dark-card border border-gray-800 rounded-xl hover:border-neon-purple transition-all text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-purple">
                {t.label}
              </h3>
              <span
                className={`text-xs font-mono px-2 py-1 rounded ${
                  t.difficulty === "Easy"
                    ? "bg-green-900 text-green-300"
                    : t.difficulty === "Medium"
                    ? "bg-yellow-900 text-yellow-300"
                    : "bg-red-900 text-red-300"
                }`}
              >
                {t.difficulty}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-dark-surface border border-gray-700 rounded-xl p-6 md:p-8 relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-surface/90 z-10 rounded-xl">
              <Loader2 className="w-12 h-12 text-neon-blue animate-spin mb-4" />
              <p className="font-mono text-neon-blue animate-pulse">
                Initializing Proof of Work...
              </p>
              <p className="text-xs text-gray-500 font-mono mt-2">
                Connecting to Node Network...
              </p>
            </div>
          )}

          {question && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="bg-gray-900/50 p-2 rounded text-xs font-mono text-gray-400 border border-gray-700">
                  Topic: {question.topic.toUpperCase()}
                </div>
                <button
                  onClick={resetRig}
                  className="text-xs text-red-400 hover:text-red-300 underline"
                >
                  Abort Mining
                </button>
              </div>

              <h3 className="text-xl md:text-2xl text-white font-bold leading-relaxed">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  let btnClass =
                    "w-full p-4 text-left rounded-lg border-2 transition-all font-mono text-sm md:text-base ";
                  if (result === null) {
                    btnClass +=
                      "border-gray-700 bg-dark-card hover:border-neon-blue hover:bg-gray-800 text-gray-300";
                  } else if (idx === question.correctIndex) {
                    btnClass +=
                      "border-neon-green bg-green-900/20 text-green-100 shadow-[0_0_15px_rgba(10,255,10,0.3)]";
                  } else if (idx === selectedOption) {
                    btnClass += "border-red-500 bg-red-900/20 text-red-100";
                  } else {
                    btnClass += "border-gray-800 bg-dark-card opacity-50";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={result !== null}
                      onClick={() => handleAnswer(idx)}
                      className={btnClass}
                    >
                      <span className="inline-block w-6 text-gray-500 mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {result === "correct" && (
                <div className="mt-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg flex items-start gap-3 animate-pulse-fast">
                  <CheckCircle className="w-6 h-6 text-neon-green flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-neon-green">
                      Block Validated!
                    </h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {question.explanation}
                    </p>
                    <p className="text-neon-blue text-xs mt-2 font-mono">
                      Reward: +50 EXP, Block added to chain.
                    </p>
                  </div>
                </div>
              )}

              {result === "incorrect" && (
                <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-400">
                      Validation Failed
                    </h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {question.explanation}
                    </p>
                    <button
                      onClick={() => startMining(selectedTopic, "Easy")}
                      className="mt-3 px-4 py-2 bg-red-900/50 border border-red-500 hover:bg-red-800 text-xs text-white rounded font-mono"
                    >
                      Try Another Nonce (New Question)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
