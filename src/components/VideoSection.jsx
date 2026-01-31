import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const subVideos = [
    {
        id: 'v1',
        image: 'https://images.unsplash.com/photo-1527153818091-1a9638521e2a?auto=format&fit=crop&q=80&w=600',
        title: 'Relaxing Summer Vibes',
        date: 'June 18, 2018'
    },
    {
        id: 'v2',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
        title: 'Daily Life in the Kitchen',
        date: 'June 15, 2018'
    },
    {
        id: 'v3',
        image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=600',
        title: 'The Art of Deep Sleep',
        date: 'June 12, 2018'
    }
];

const VideoSection = ({ language }) => {
    return (
        <section className="bg-[#0c141e] py-20 px-4" aria-labelledby="video-gallery-title">
            <h2 id="video-gallery-title" className="sr-only">
                {language === 'hi' ? 'वीडियो विशेषताएं' : 'Video Features'}
            </h2>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Featured Video */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    role="button"
                    tabIndex={0}
                    aria-label={language === 'hi' ? "विशेष वीडियो चलाएं: टाइम्स स्क्वायर में यातायात की समस्याएं" : "Play featured video: Traffic Problems in Time Square"}
                    className="relative h-[500px] lg:h-[650px] w-full rounded-sm overflow-hidden group cursor-pointer focus-visible:ring-4 focus-visible:ring-red-600 outline-none"
                >
                    <img
                        src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1600"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-20 h-20 bg-[#ff3b5c] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#ff3b5c]/40"
                        >
                            <Play size={32} fill="currentColor" aria-hidden="true" />
                        </motion.div>
                        <div className="space-y-2">
                            <span className="text-[#ff3b5c] text-xs font-black uppercase tracking-[0.3em]">June 20, 2018</span>
                            <h3 className="text-4xl lg:text-6xl font-black text-white font-serif leading-tight">
                                {language === 'hi' ? 'टाइम्स स्क्वायर में यातायात की समस्याएं' : 'Traffic Problems in Time Square'}
                            </h3>
                        </div>
                    </div>
                </motion.div>

                {/* Sub Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subVideos.map((video, idx) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="space-y-4 group cursor-pointer outline-none focus-within:ring-2 focus-within:ring-red-600 p-1 rounded"
                            role="button"
                            tabIndex={0}
                            aria-label={language === 'hi' ? `वीडियो चलाएं: ${video.title}` : `Play video: ${video.title}`}
                        >
                            <div className="relative aspect-video rounded-sm overflow-hidden bg-slate-800">
                                <img
                                    src={video.image}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    alt=""
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-[#ff3b5c] rounded-full flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                        <Play size={20} fill="currentColor" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[#ff3b5c] text-[10px] font-black uppercase tracking-widest">{video.date}</span>
                                <h4 className="text-lg font-bold text-white group-hover:text-[#ff3b5c] transition-colors line-clamp-1">
                                    {video.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
