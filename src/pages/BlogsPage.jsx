import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowUpRight } from 'lucide-react';

const blogPosts = [
    {
        title: 'Modern Journalism in the Age of AI',
        excerpt: 'How artificial intelligence is changing the way news is gathered and reported globally...',
        author: 'Amitabh Kant',
        date: 'March 1, 2025',
        category: 'Digital',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'The Sustainable Living Guide',
        excerpt: 'Small changes in your daily routine that can lead to a massive impact on the environment...',
        author: 'Priya Verma',
        date: 'Feb 28, 2025',
        category: 'Lifestyle',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Future of Remote Tech Work',
        excerpt: 'Why distributed teams are becoming the norm for top silicon valley firms in 2025...',
        author: 'Rajesh Sharma',
        date: 'Feb 25, 2025',
        category: 'Work',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Culinary Traditions of India',
        excerpt: 'Exploring the diverse spices and ancient techniques of regional Indian cooking...',
        author: 'Sanjeev Kapoor',
        date: 'Feb 22, 2025',
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800'
    }
];

const BlogsPage = ({ language }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 dark:border-gray-800 pb-12">
                <div className="space-y-4">
                    <span className="text-red-600 text-xs font-black uppercase tracking-widest">
                        {language === 'hi' ? 'हमारा ब्लॉग' : 'Our Blog'}
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white font-serif tracking-tighter">
                        {language === 'hi' ? 'ताजा विचार' : 'Fresh Thoughts'}
                    </h1>
                </div>
                <p className="text-slate-500 dark:text-gray-400 max-w-sm text-lg leading-relaxed">
                    {language === 'hi'
                        ? 'हमारे विशेषज्ञों और लेखकों के समुदाय से गहराई से विश्लेषण और विचार।'
                        : 'Deep dives and opinion pieces from our community of experts and writers.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-gray-900">
                            <span className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                {post.category || 'Startups'}
                            </span>
                            <img
                                src={post.image || 'https://images.unsplash.com/photo-1499750310159-5b9887039e54?auto=format&fit=crop&q=80&w=800'}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                alt={post.title}
                            />
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="pt-4 mt-auto border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400">
                                        <User size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">{post.author}</span>
                                        <span className="text-[9px] font-medium text-slate-400">{post.date}</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all text-slate-400">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogsPage;
