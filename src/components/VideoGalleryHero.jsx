import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, MessageSquare, User, ChevronUp, ChevronDown } from 'lucide-react';
import { useArticles } from '../context/ArticlesContext';

const VideoGalleryHero = ({ language }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const { videos: videoArticles, loading } = useArticles();

    // Map video articles to component format
    const videos = videoArticles.length > 0
        ? videoArticles.map(a => ({
            id: a.id,
            title: a.title,
            author: a.author?.name || 'Mitaan',
            time: new Date(a.createdAt).toLocaleDateString(),
            comments: 0,
            image: a.image || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600',
            duration: "00:00",
            url: a.videoUrl
        }))
        : [{
            id: 1,
            title: "Business Agility in the Digital Age",
            author: "Nisi Nyung",
            time: "7d ago",
            comments: 23,
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
            duration: "12:45"
        }];

    if (videos.length === 0) return null;

    const activeVideo = videos[activeIndex];
    const visiblePlaylist = videos.slice(startIndex, startIndex + 3);

    const handleNext = () => {
        if (startIndex + 3 < videos.length) {
            setStartIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prev => prev - 1);
        }
    };

    return (
        <section className="bg-white dark:bg-[#030712] text-slate-900 dark:text-white py-16 px-4 md:px-8 lg:px-12 rounded-3xl overflow-hidden shadow-2xl my-12 border border-slate-200 dark:border-white/10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">
                        {language === 'hi' ? 'अभी लाइव' : 'LIVE NOW'}
                    </h2>
                </div>
                <div className="h-[1px] bg-slate-200 dark:bg-white/20 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px] lg:h-[550px]">
                {/* Main Video Area */}
                <div className="lg:col-span-8 relative rounded-2xl overflow-hidden group h-full bg-neutral-900">
                    <img
                        src={activeVideo.image}
                        alt={activeVideo.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
                            <Play size={40} className="ml-2 text-white fill-white" />
                        </button>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 line-clamp-2">
                            {activeVideo.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm font-medium text-white/70">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                    <User size={20} className="w-full h-full p-1" />
                                </div>
                                <span className="text-white font-bold">{activeVideo.author}</span>
                            </div>
                            <span className="flex items-center gap-1"><Clock size={14} /> {activeVideo.time}</span>
                            <span className="flex items-center gap-1"><MessageSquare size={14} /> {activeVideo.comments}</span>
                        </div>
                    </div>
                </div>

                {/* Right Playlist Sidebar */}
                <div className="lg:col-span-4 flex flex-col h-full gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="w-full py-3 bg-[#e00000] hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <ChevronUp size={16} /> {language === 'hi' ? 'पिछला' : 'Prev'}
                    </button>

                    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                        <AnimatePresence mode='popLayout'>
                            {visiblePlaylist.map((video) => (
                                <motion.div
                                    key={video.id}
                                    layout
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    onClick={() => setActiveIndex(videos.findIndex(v => v.id === video.id))}
                                    className={`relative flex gap-4 p-3 rounded-xl cursor-pointer transition-all border group ${activeVideo.id === video.id ? 'bg-red-50 dark:bg-white/10 border-red-600' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:bg-slate-100 dark:hover:bg-white/10'}`}
                                >
                                    <div className="w-32 h-20 rounded-lg overflow-hidden shrink-0 relative">
                                        <img src={video.image} className="w-full h-full object-cover" alt="" />
                                        <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                            {video.duration}
                                        </div>
                                        {activeVideo.id === video.id && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-white animate-pulse"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className={`text-sm font-bold line-clamp-2 leading-tight mb-2 ${activeVideo.id === video.id ? 'text-red-700 dark:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                            {video.title}
                                        </h4>
                                        <span className="text-xs text-gray-500 font-medium">{video.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={startIndex + 3 >= videos.length}
                        className="w-full py-3 bg-[#e00000] hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {language === 'hi' ? 'अगला' : 'Next'} <ChevronDown size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VideoGalleryHero;
