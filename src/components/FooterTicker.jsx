import React from 'react';

const FooterTicker = ({ language }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-10 bg-[#0c141e] border-t border-slate-800 flex items-center px-4 z-50 overflow-hidden"
      role="status"
      aria-label={language === 'hi' ? "मार्केट डेटा टिकर" : "Market Data Ticker"}
    >
      <div className="flex items-center gap-6 animate-marquee whitespace-nowrap motion-reduce:animate-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Gold</span>
          <span className="text-[10px] font-bold text-green-400">+2.02%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">S&P 500</span>
          <span className="text-[10px] font-bold text-red-400">-0.45%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500" aria-hidden="true"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Oil</span>
          <span className="text-[10px] font-bold text-green-400">+1.12%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500" aria-hidden="true"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Gold</span>
          <span className="text-[10px] font-bold text-green-400">+2.02%</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
          cursor: pointer;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default FooterTicker;
