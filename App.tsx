import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Copy, Trash2, CheckCircle2, FileText, ArrowDown } from 'lucide-react';
import Header from './components/Header';
import Button from './components/Button';
import { processLyrics } from './utils/lyricProcessor';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Auto-process when input changes (with debounce could be better, but instant is fine for text)
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    const processed = processLyrics(input);
    setOutput(processed);
    setIsCopied(false);
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [output]);

  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsCopied(false);
  };

  const handlePasteExample = () => {
    const example = `[00:00.00]Montagem Nada Tropica - Eternxlkz
[00:01.28]Composed by：Eternxlkz
[00:02.24]De la fuma mala fuma 吞云吐雾间 尽是劣质烟雾
[00:03.45]Se la pasan diciendo que soy mala 他们总是喋喋不休 说我品性不佳
[00:05.38]Porque no me aguanto drama de nada 只因我向来无法容忍 任何无谓的闹剧
[00:07.37]Dime si vienes a mi cama a mi cama 告诉我 你是否会来我的床榻 我的床榻`;
    setInput(example);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <Header />

        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
          {/* Left Column: Input */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-100/50 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span>Original Lyrics (Mixed)</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handlePasteExample}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                >
                  Paste Example
                </button>
                <Button 
                  variant="ghost" 
                  onClick={handleClear} 
                  className="!p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50"
                  title="Clear Input"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative flex-1">
              <textarea
                className="w-full h-full p-4 resize-none font-mono text-sm leading-relaxed text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-50 transition-colors"
                placeholder="Paste your lyrics here...&#10;Example: [00:01.00]Hello World 你好世界"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Middle: Indicator (Desktop) / Separator (Mobile) */}
          <div className="flex lg:flex-col items-center justify-center shrink-0 text-slate-300">
            <div className="hidden lg:flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="p-2 bg-white rounded-full shadow-sm border border-slate-200">
                <ArrowRight className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
            </div>
            <div className="lg:hidden flex items-center gap-2 py-2">
               <ArrowDown className="w-5 h-5 text-indigo-500 animate-bounce" />
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-indigo-50/50 border-b border-indigo-100 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Formatted Result</span>
              </div>
              <Button
                variant={isCopied ? "secondary" : "primary"}
                onClick={handleCopy}
                disabled={!output}
                className="!py-1.5 !px-3 !text-xs"
                icon={isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {isCopied ? "Copied!" : "Copy Result"}
              </Button>
            </div>
            <div className="relative flex-1 bg-slate-50/30">
              <textarea
                readOnly
                className="w-full h-full p-4 resize-none font-mono text-sm leading-relaxed text-slate-600 focus:outline-none bg-transparent"
                placeholder="The formatted lyrics will appear here automatically..."
                value={output}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-slate-400 text-xs">
          <p>Privacy Note: All processing happens locally in your browser.</p>
        </div>
      </div>
    </div>
  );
};

export default App;