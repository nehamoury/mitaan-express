import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PollWidget = ({ language }) => {
    const [voted, setVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const question = language === 'hi'
        ? "क्या एआई पत्रकारिता की जगह ले लेगा?"
        : "Will AI replace journalism?";

    const options = [
        { id: 1, text: language === 'hi' ? "हाँ, पूरी तरह से" : "Yes, completely", percent: 15 },
        { id: 2, text: language === 'hi' ? "नहीं, इंसान जरूरी है" : "No, humans are essential", percent: 65 },
        { id: 3, text: language === 'hi' ? "केवल डेटा विश्लेषण में" : "Only in data analysis", percent: 20 },
    ];

    const handleVote = (id) => {
        setSelectedOption(id);
        setVoted(true);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl space-y-6">
            <div className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                {language === 'hi' ? 'जनमत' : 'Readers Poll'}
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-tight">
                {question}
            </h3>

            <div className="space-y-3">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => !voted && handleVote(opt.id)}
                        disabled={voted}
                        className="w-full relative h-12 rounded-xl overflow-hidden bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-red-600 transition-colors group"
                    >
                        {voted && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${opt.percent}%` }}
                                className={`absolute inset-y-0 left-0 bg-red-100 dark:bg-red-900/30 transition-all ${selectedOption === opt.id ? 'bg-red-200 dark:bg-red-900/50' : ''}`}
                            />
                        )}
                        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                            <span className={`text-sm font-medium ${selectedOption === opt.id ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'}`}>
                                {opt.text}
                            </span>
                            {voted && (
                                <span className="text-xs font-bold text-slate-400">
                                    {opt.percent}%
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="text-xs text-slate-400 text-center">
                {voted ? (language === 'hi' ? 'वोट देने के लिए धन्यवाद!' : 'Thanks for voting!') : (language === 'hi' ? 'वोट करने के लिए क्लिक करें' : 'Click to vote')}
            </div>
        </div>
    );
};

export default PollWidget;
