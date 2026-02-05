import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import AdSpace from './AdSpace';
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
                <div className="pt-4">
                    <AdSpace position="sidebar" className="my-0" />
                </div>
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
                            <span className="text-4xl font-black text-slate-300 dark:text-slate-700 font-serif leading-none group-hover:text-red-600 transition-colors">
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

            {/* Subscription Section Removed */}
        </aside>
    );
};

export default Sidebar;
