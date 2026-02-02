import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, User, Eye,
    Share2, Bookmark, Check,
    Facebook, Twitter, Linkedin
} from 'lucide-react';
import { fetchBlogBySlug, fetchArticles } from '../services/api';
import CommentsSection from '../components/CommentsSection';

const BlogDetailPage = ({ language }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const blogData = await fetchBlogBySlug(slug);
                setBlog(blogData);

                // Fetch latest news for sidebar
                const newsData = await fetchArticles('', '', '', language, 'PUBLISHED');
                setLatestNews(newsData.articles ? newsData.articles.slice(0, 5) : (Array.isArray(newsData) ? newsData.slice(0, 5) : []));
            } catch (error) {
                console.error("Failed to load blog details", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [slug, language]);

    const handleShare = async (platform) => {
        const url = window.location.href;
        const text = blog?.title || 'Check this blog';

        if (platform === 'copy') {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return;
        }

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Blog Not Found</h1>
                <button
                    onClick={() => navigate('/blogs')}
                    className="px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
                >
                    ← Back to Blogs
                </button>
            </div>
        );
    }

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white dark:bg-[#030712]"
        >
            <div className="max-w-4xl mx-auto px-4 py-6">
                <button
                    onClick={() => navigate('/blogs')}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors font-medium"
                >
                    <ArrowLeft size={20} />
                    {language === 'hi' ? 'वापस जाएं' : 'BACK TO BLOGS'}
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content */}
                <article className="lg:col-span-8">
                    <div className="inline-block text-xs font-black text-red-600 uppercase tracking-widest mb-4">
                        {blog.category?.name || 'BLOG'}
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 font-serif">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                {blog.author?.image ? (
                                    <img src={blog.author.image} alt={blog.author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-slate-500" />
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{blog.author?.name || 'Author'}</p>
                                <p className="text-xs text-slate-500">{formattedDate}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                            <button className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                                <Eye size={14} /> {blog.views || 0}
                            </button>
                            <button
                                onClick={() => handleShare('copy')}
                                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            >
                                {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                            </button>
                        </div>
                    </div>

                    {blog.image && (
                        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-auto max-h-[400px] object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?auto=format&fit=crop&q=80&w=2000';
                                }}
                            />
                        </div>
                    )}

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-red-600 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
                            {blog.tags.map(tag => (
                                <span
                                    key={tag.id}
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Comments */}
                    <CommentsSection blogId={blog.id} language={language} />
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/5 sticky top-24">
                        <h3 className="font-bold font-serif text-xl border-b border-slate-200 dark:border-white/10 pb-3 mb-6">
                            {language === 'hi' ? 'ताज़ा ख़बरें' : 'Latest News'}
                        </h3>
                        <div className="space-y-6">
                            {latestNews.map(news => (
                                <Link to={`/article/${news.slug}`} key={news.id} className="group flex gap-4 items-start">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                                        <img
                                            src={news.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=200'}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                                            {news.title}
                                        </h4>
                                        <span className="text-xs text-slate-400 mt-2 block">
                                            {new Date(news.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </motion.div>
    );
};

export default BlogDetailPage;
