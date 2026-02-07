import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image as ImageIcon, ArrowRight, X, ZoomIn } from 'lucide-react';
import { usePublicMedia } from '../hooks/useMedia';
import { useNavigate } from 'react-router-dom';

const GalleryStrip = ({ language }) => {
    const navigate = useNavigate();
    const { data: images = [], isLoading } = usePublicMedia('IMAGE');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    // Take only the latest 8 images
    const displayImages = images.slice(0, 8);

    if (isLoading || images.length === 0) return null;

    return (
        <section ref={containerRef} className="py-24 overflow-hidden bg-white dark:bg-black border-y border-slate-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
                <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-red-600/10 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                        {language === 'hi' ? 'दृश्य संग्रह' : 'VISUAL STORIES'}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-serif tracking-tighter text-slate-900 dark:text-white leading-none">
                        {language === 'hi' ? 'गैलरी हाइलाइट्स' : 'Gallery Highlights'}
                    </h2>
                </div>

                <button
                    onClick={() => navigate('/gallery')}
                    className="hidden md:flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-red-600 transition-colors group"
                >
                    {language === 'hi' ? 'सभी देखें' : 'VIEW GALLERY'}
                    <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                    </span>
                </button>
            </div>

            {/* Horizontal Scroll Strip */}
            <div className="relative w-full">
                <motion.div
                    style={{ x }}
                    className="flex gap-6 pl-4 md:pl-8 lg:pl-12 w-max"
                >
                    {displayImages.map((img, idx) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="relative w-[280px] md:w-[350px] aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5"
                            onClick={() => navigate('/gallery')}
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">
                                    {img.category || 'GALLERY'}
                                </span>
                                <h3 className="text-xl font-bold text-white font-serif leading-tight">
                                    {img.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}

                    {/* View More Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative w-[200px] aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group"
                        onClick={() => navigate('/gallery')}
                    >
                        <div className="text-center space-y-4 group-hover:scale-110 transition-transform">
                            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-red-600/30">
                                <ArrowRight size={24} />
                            </div>
                            <span className="block text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                {language === 'hi' ? 'और देखें' : 'View More'}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="mt-8 flex justify-center md:hidden">
                <button
                    onClick={() => navigate('/gallery')}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/30"
                >
                    {language === 'hi' ? 'पूरी गैलरी देखें' : 'View Full Gallery'}
                </button>
            </div>
        </section>
    );
};

export default GalleryStrip;
