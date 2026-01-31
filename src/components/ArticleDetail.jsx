import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Share2, MessageSquare, Bookmark, Play, Pause, Volume2 } from 'lucide-react';
import CommentsSection from './CommentsSection';

const ArticleDetail = ({ article, onBack, language }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        // Cleanup speech on unmount
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleSpeak = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const textToSpeak = `${article.title}. ${article.description}`;
            const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
            newUtterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
            newUtterance.rate = 0.9; // Slightly slower for better clarity

            newUtterance.onend = () => setIsPlaying(false);

            window.speechSynthesis.speak(newUtterance);
            setUtterance(newUtterance);
            setIsPlaying(true);
        }
    };

    if (!article) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-12"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors"
                >
                    <ArrowLeft size={16} /> {language === 'hi' ? 'वापस जाएं' : 'Back to Home'}
                </button>

                {/* Article Header */}
                <header className="space-y-8 mb-12">
                    <span className="text-red-600 font-black tracking-[0.3em] text-xs uppercase">
                        {article.category || 'NEWS'}
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black font-serif text-slate-900 dark:text-white leading-[1.1]">
                        {article.title}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-y border-slate-100 dark:border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                                {article.authorImage && <img src={article.authorImage} className="w-full h-full object-cover" alt="" />}
                            </div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                    {article.author || 'Mitaan Desk'}
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                                    <span>{article.date || 'Today'}</span>
                                    <span>•</span>
                                    <span>{article.readTime || '5 min read'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Audio Player Button */}
                            <button
                                onClick={handleSpeak}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${isPlaying
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20'
                                    }`}
                            >
                                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                                <span>{isPlaying ? (language === 'hi' ? 'रोकें' : 'Pause') : (language === 'hi' ? 'सुनें' : 'Listen')}</span>
                                {isPlaying && <span className="flex gap-0.5 items-end h-3 ml-1">
                                    <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-current rounded-full" />
                                    <motion.span animate={{ height: [8, 4, 12] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-current rounded-full" />
                                    <motion.span animate={{ height: [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-current rounded-full" />
                                </span>}
                            </button>

                            <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10 mx-2 hidden md:block"></div>

                            <button className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors"><Share2 size={18} /></button>
                            <button className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors"><Bookmark size={18} /></button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-loose text-slate-700 dark:text-slate-300">
                    <p className="text-2xl font-sans font-medium leading-relaxed text-slate-900 dark:text-white mb-8 border-l-4 border-red-600 pl-6">
                        {article.description || article.content}
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <h3>The Rising Impact</h3>
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    <figure className="my-12">
                        <img className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Detail" />
                        <figcaption className="text-center text-sm mt-4 text-slate-500 font-sans">Figure 1: Graphical representation of the data</figcaption>
                    </figure>

                    <h3>Future Perspectives</h3>
                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                </div>

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/10">
                    <div className="flex flex-wrap gap-3">
                        {['News', 'Global', 'Trending', 'Featured'].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-600 cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Comments System */}
                <CommentsSection language={language} />
            </div>
        </motion.div>
    );
};

export default ArticleDetail;
