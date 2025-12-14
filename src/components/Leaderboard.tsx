import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MOCK_LEADERBOARD } from "../constants";

export const Leaderboard: React.FC = () => {
  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-bold text-white mb-6 font-mono border-b border-gray-800 pb-2">
        Network Consensus (Leaderboard)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table View */}
        <div className="lg:col-span-2 bg-dark-card border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-400 font-mono text-sm">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Node Identity</th>
                <th className="p-4">Blocks Validated</th>
                <th className="p-4">Hash Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {MOCK_LEADERBOARD.map((node, i) => (
                <tr
                  key={node.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-4 font-mono text-gray-500">#{i + 1}</td>
                  <td className="p-4 font-bold flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${node.avatarColor.replace(
                        "text-",
                        "bg-"
                      )}`}
                    ></span>
                    {node.name}
                  </td>
                  <td className="p-4 font-mono text-neon-blue">
                    {node.blocksMined.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-400">
                    {node.hashRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart View */}
        <div className="bg-dark-card border border-gray-800 rounded-xl p-4 flex flex-col">
          <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">
            Top Miners Activity
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_LEADERBOARD}
                layout="vertical"
                margin={{ left: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  interval={0}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f111a",
                    borderColor: "#334155",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#00f3ff" }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="blocksMined" radius={[0, 4, 4, 0]}>
                  {MOCK_LEADERBOARD.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#ff00ff" : "#00f3ff"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
