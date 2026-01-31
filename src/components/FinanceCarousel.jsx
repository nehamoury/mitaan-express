import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

const mustReadArticles = [
    {
        id: 'mr1',
        category: 'FINANCE',
        title: "Crypto Markets Rebound with New Global Regulations",
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1200'
    },
    {
        id: 'mr2',
        category: 'TECH',
        title: "The Future of AI: Silicon Valley's Next Big Bet",
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200'
    },
    {
        id: 'mr3',
        category: 'DESIGN',
        title: "Minimalism in 2026: Why Less is More for Generation Alpha",
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200'
    },
    {
        id: 'mr4',
        category: 'TRAVEL',
        title: "Hidden Gems of Japan: Exploring the Uncharted Peaks of Hokkaido",
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200'
    }
];

const FinanceCarousel = ({ language }) => {
    const scrollRef = useRef(null);

    return (
        <section className="bg-[#030712] py-32 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-24 mb-16 flex items-end justify-between">
                <div className="space-y-4">
                    <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em]">
                        {language === 'hi' ? 'विशेष चयन' : 'Editorial Picks'}
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter font-serif">
                        {language === 'hi' ? 'अवश्य पढ़ें' : 'MUST READ'}
                    </h2>
                </div>

                <button className="hidden lg:flex items-center gap-4 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors group">
                    {language === 'hi' ? 'सभी देखें' : 'View the Archive'}
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight size={16} />
                    </div>
                </button>
            </div>

            {/* Full-Width Scrolling Container */}
            <div className="flex gap-8 overflow-x-auto no-scrollbar px-8 lg:px-24 pb-12">
                {mustReadArticles.map((article, idx) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        whileHover={{ y: -20 }}
                        className="relative flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[800px] aspect-[16/9] rounded-[48px] overflow-hidden cursor-pointer group shadow-2xl"
                    >
                        {/* Background Image */}
                        <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        {/* Content at Bottom */}
                        <div className="absolute bottom-0 left-0 p-12 lg:p-16 w-full space-y-6">
                            <span className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase">
                                {language === 'hi' ? 'श्रेणी' : article.category}
                            </span>
                            <h3 className="text-white font-black text-4xl lg:text-5xl leading-[1.1] font-serif tracking-tight max-w-2xl group-hover:text-red-600 transition-colors">
                                {language === 'hi' ? 'लेख का शीर्षक' : article.title}
                            </h3>
                            <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>{language === 'hi' ? 'पूरा लेख' : 'Read Article'}</span>
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FinanceCarousel;
