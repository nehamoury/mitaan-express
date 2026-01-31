import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const poems = [
    {
        title: 'ओस की बूंदें',
        author: 'कवि नीरज',
        snippet: 'हरी घास पर चमकती वो छोटी सी हंसी, सुबह की पहली किरण संग बहती वो बेकसी...',
        category: 'Nature',
        image: 'https://images.unsplash.com/photo-1518173946687-a4c8a9833d8e?auto=format&fit=crop&q=80&w=600'
    },
    {
        title: 'Echoes of Time',
        author: 'S. K. Varma',
        snippet: 'Walking through the ruins of gold, stories that remain untold, whispers in the wind so cold...',
        category: 'Philosophical',
        image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&q=80&w=600'
    },
    {
        title: 'अधूरे ख्वाब',
        author: 'मीरा सिंह',
        snippet: 'रात की तन्हाई में जब यादें सरकती हैं, पुराने संदूकों से कुछ बातें खनकती हैं...',
        category: 'Love',
        image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&q=80&w=600'
    },
    {
        title: 'City Lights',
        author: 'John Doe',
        snippet: 'Neon signs and busy feet, coffee smells on every street, where the lonely and dreamers meet...',
        category: 'Urban',
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=600'
    }
];

const PoetryPage = ({ language }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 pb-20">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-xs font-black uppercase tracking-[0.3em] inline-block"
                >
                    {language === 'hi' ? 'काव्य कोना' : 'Poetry Corner'}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white font-serif tracking-tighter"
                >
                    {language === 'hi' ? 'शब्दों का जादू' : 'Magic of Words'}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed font-serif italic"
                >
                    {language === 'hi'
                        ? 'भावनाओं को छंदों में पिरोती हुई कुछ बेहतरीन रचनाएं जो आपके दिल को छू लेंगी।'
                        : 'Exquisite compositions weaving emotions into verses that will touch your soul.'}
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {poems.map((poem, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group cursor-pointer bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative aspect-[3/2] overflow-hidden bg-slate-100 dark:bg-gray-900">
                            <img
                                src={poem.image}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                alt={poem.title}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <Quote size={32} className="text-white/60 group-hover:text-white transition-all transform hover:scale-110 drop-shadow-lg" />
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-red-600 text-[9px] font-black uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">{poem.category}</span>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{poem.author}</span>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-tight group-hover:text-red-600 transition-colors">
                                    {poem.title}
                                </h2>
                                <p className="text-slate-500 dark:text-gray-400 font-serif leading-relaxed text-sm italic line-clamp-3">
                                    "{poem.snippet}"
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-widest transition-colors">
                                    {language === 'hi' ? 'पढ़ें' : 'READ'}
                                </span>
                                <div className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PoetryPage;
