import React from "react";
import { Block } from "../types";
import { ArrowRight, Box, Lock } from "lucide-react";

interface Props {
  chain: Block[];
}

export const BlockChainVisualizer: React.FC<Props> = ({ chain }) => {
  return (
    <div className="w-full overflow-x-auto p-6 bg-dark-card rounded-xl border border-gray-800 shadow-inner">
      <h3 className="text-xl font-mono text-neon-blue mb-4 flex items-center gap-2">
        <Box className="w-5 h-5" /> Your Local Chain
      </h3>

      {chain.length === 0 ? (
        <div className="text-gray-500 italic font-mono text-sm py-8 text-center">
          Genesis block pending... Start mining to build your chain.
        </div>
      ) : (
        <div className="flex items-center gap-2 min-w-max">
          {chain.map((block, i) => (
            <React.Fragment key={block.hash}>
              <div className="relative group">
                <div className="w-48 p-4 bg-dark-surface border border-neon-purple/30 rounded-lg hover:border-neon-purple transition-all hover:scale-105 cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-gray-400">
                      #{block.index}
                    </span>
                    <Lock className="w-3 h-3 text-neon-green" />
                  </div>
                  <div
                    className="text-xs text-gray-300 font-bold truncate mb-1"
                    title={block.data}
                  >
                    {block.data}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 truncate">
                    Hash:{" "}
                    <span className="text-neon-blue">
                      {block.hash.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-600 truncate">
                    Prev: {block.prevHash.substring(0, 8)}...
                  </div>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-black border border-gray-700 rounded text-xs hidden group-hover:block z-20 shadow-xl">
                  <p className="font-bold text-neon-pink mb-1">Block Details</p>
                  <p>
                    Timestamp: {new Date(block.timestamp).toLocaleTimeString()}
                  </p>
                  <p>Difficulty: {block.difficulty}</p>
                  <p className="mt-1 text-gray-400 italic">"{block.data}"</p>
                </div>
              </div>

              {i < chain.length - 1 && (
                <div className="flex-shrink-0 text-gray-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
              {i === chain.length - 1 && (
                <div className="flex-shrink-0 text-gray-600 animate-pulse">
                  <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
