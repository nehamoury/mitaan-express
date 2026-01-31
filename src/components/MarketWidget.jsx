import React from 'react';
import { TrendingUp, TrendingDown, IndianRupee, Coins } from 'lucide-react';

const MarketWidget = ({ language }) => {
    // Mock data for market rates
    const marketData = [
        { id: 1, name: language === 'hi' ? 'सेन्सेक्स' : 'Sensex', value: '72,400.35', change: '+1.2%', isUp: true },
        { id: 2, name: language === 'hi' ? 'निफ्टी 50' : 'Nifty 50', value: '21,980.10', change: '+0.8%', isUp: true },
        { id: 3, name: language === 'hi' ? 'सोना (10g)' : 'Gold (10g)', value: '₹62,500', change: '-0.3%', isUp: false },
        { id: 4, name: language === 'hi' ? 'चांदी (1kg)' : 'Silver (1kg)', value: '₹74,200', change: '+0.5%', isUp: true },
    ];

    return (
        <div className="bg-white dark:bg-[#030712] border border-slate-100 dark:border-white/10 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-white/5 text-red-600 rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                        {language === 'hi' ? 'बाज़ार भाव' : 'Market Watch'}
                    </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            <div className="space-y-4">
                {marketData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-xl transition-colors -mx-2">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{item.name}</span>
                            <span className="text-xs text-slate-400 font-medium mt-0.5">LIVE</span>
                        </div>
                        <div className="text-right">
                            <div className="font-black text-slate-900 dark:text-white font-mono">{item.value}</div>
                            <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {item.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {item.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors border-t border-slate-100 dark:border-white/10 pt-4">
                {language === 'hi' ? 'पूरा बाज़ार देखें' : 'View Full Market'}
            </button>
        </div>
    );
};

export default MarketWidget;
