import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video as VideoIcon, Play, Clock, Eye } from 'lucide-react';

const videos = [
    {
        id: 1,
        title: "Breaking: Global Climate Summit 2026",
        category: "News",
        thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=800",
        duration: "12:45",
        views: "2.3M"
    },
    {
        id: 2,
        title: "Tech Review: Future of AI in 2026",
        category: "Technology",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        duration: "08:30",
        views: "1.8M"
    },
    {
        id: 3,
        title: "Sports Highlights: Championship Finals",
        category: "Sports",
        thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
        duration: "15:20",
        views: "5.1M"
    },
    {
        id: 4,
        title: "Documentary: Ocean Conservation",
        category: "Documentary",
        thumbnail: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800",
        duration: "45:00",
        views: "890K"
    },
    {
        id: 5,
        title: "Interview: CEO Insights on Innovation",
        category: "Business",
        thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        duration: "22:15",
        views: "1.2M"
    },
    {
        id: 6,
        title: "Cultural Festival: Traditional Dance",
        category: "Culture",
        thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
        duration: "10:30",
        views: "650K"
    }
];

const VideoPage = ({ language }) => {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'News', 'Technology', 'Sports', 'Documentary', 'Business', 'Culture'];

    const filteredVideos = filter === 'All'
        ? videos
        : videos.filter(video => video.category === filter);

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
                            <VideoIcon size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-serif text-slate-900 dark:text-white tracking-tighter">
                                {language === 'hi' ? 'वीडियो' : 'Videos'}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                                {language === 'hi' ? 'हमारे वीडियो संग्रह देखें' : 'Watch our latest video content'}
                            </p>
                        </div>
                    </motion.div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-xl hover:shadow-2xl transition-all">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                        <Play size={24} className="text-white ml-1" fill="white" />
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg flex items-center gap-1">
                                    <Clock size={12} className="text-white" />
                                    <span className="text-xs font-bold text-white">{video.duration}</span>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 px-3 py-1 bg-red-600 rounded-full">
                                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                        {video.category}
                                    </span>
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Eye size={14} />
                                        <span className="font-medium">{video.views}</span>
                                    </div>
                                    <span>•</span>
                                    <span className="font-medium">{video.duration}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
