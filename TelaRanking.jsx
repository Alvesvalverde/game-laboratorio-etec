import React from "react";
import { Menu } from "lucide-react";

export default function RankingScreen() {
  const ranking = Array.from({ length: 10 }, (_, i) => `${i + 1}. xxx`);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-red-700 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/79/Logo_Etec_CPS.png"
            alt="ETEC"
            className="h-12"
          />
        </div>

        <Menu className="text-black w-8 h-8" />
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-red-700 w-[400px] h-[450px] rounded-2xl shadow-lg flex flex-col items-center py-6">
          {/* Crown Icon */}
          <div className="text-black text-4xl mb-2">👑</div>

          {/* Title */}
          <h1 className="text-black text-xl font-semibold mb-4">Ranking</h1>

          {/* List */}
          <ul className="text-white text-sm text-left">
            {ranking.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-700 h-16"></footer>
    </div>
  );
}
