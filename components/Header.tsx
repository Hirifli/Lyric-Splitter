import React from 'react';
import { Music, ArrowRightLeft } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          LRC Lyric <span className="text-indigo-600">Splitter</span>
        </h1>
      </div>
      <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        Automatically separate mixed lines (Original + Translation) into synchronized separate lines.
        Paste your raw LRC text below and get a cleaner version for your music player.
      </p>
    </header>
  );
};

export default Header;