import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import MarketWidget from './MarketWidget';
import { useArticles } from '../context/ArticlesContext';

const Sidebar = ({ language, showWeather = true }) => {
    const { trending, loading } = useArticles();

    // Map trending articles to sidebar format
    const sidebarArticles = trending.length > 0
        ? trending.slice(0, 5).map(a => ({
            id: a.id,
            title: a.title,
            image: a.image,
            category: a.category?.name || 'TRENDING',
            slug: a.slug
        }))
        : [{
            id: 's1',
            title: "Welcome to Mitaan Express",
            image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&q=80&w=300',
            category: 'News'
        }];

    return (
        <aside className="sticky top-32 space-y-12">
            <div className="space-y-6">
                {showWeather && <WeatherWidget language={language} />}
                <MarketWidget language={language} />
            </div>

            <section>
                <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] mb-10 flex items-center justify-between">
                    <span>{language === 'hi' ? 'ट्रेंडिंग नाउ' : 'Trending Now'}</span>
                    <div className="h-[1px] flex-1 bg-slate-100 dark:bg-gray-800 ml-6"></div>
                </h3>

                <div className="space-y-12">
                    {sidebarArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex gap-8 cursor-pointer items-start"
                            onClick={() => window.location.href = `/article/${article.slug}`} // Assuming basic navigation
                        >
                            <span className="text-4xl font-black text-slate-100 dark:text-gray-800 font-serif leading-none group-hover:text-red-600 transition-colors">
                                0{index + 1}
                            </span>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">{article.category}</span>
                                <h4 className="text-lg font-bold text-slate-800 dark:text-gray-200 leading-tight group-hover:text-red-600 transition-colors line-clamp-3 font-serif">
                                    {article.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="bg-slate-900 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-[40px] p-10 text-white space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <ArrowUpRight size={120} />
                </div>
                <h2 className="text-3xl font-black leading-tight font-serif relative z-10">
                    {language === 'hi' ? 'पूरी कहानी' : 'Go beyond'} <br />
                    <span className="text-red-600">{language === 'hi' ? 'आप तक लाते हैं' : 'the headline.'}</span>
                </h2>
                <p className="text-white/60 dark:text-white/60 text-sm leading-relaxed font-medium relative z-10">
                    {language === 'hi' ? 'हमारे विशेषज्ञों की गहन विश्लेषण रिपोर्ट के लिए सदस्य बनें।' : 'Subscribe to unlock in-depth analysis from our global newsroom.'}
                </p>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="w-full py-5 bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 relative z-10"
                >
                    {language === 'hi' ? 'सदस्य बनें' : 'Join Now'}
                </button>
            </section>
        </aside>
    );
};

export default Sidebar;
