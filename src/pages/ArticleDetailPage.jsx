import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Calendar, User, Eye, Clock,
    Share2, Bookmark, MessageSquare, ThumbsUp,
    Facebook, Twitter, Linkedin, Copy, Check
} from 'lucide-react';
import { useArticles } from '../context/ArticlesContext';
import CommentsSection from '../components/CommentsSection';
import AdSpace from '../components/AdSpace';

const ArticleDetailPage = ({ language }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { articles, loading } = useArticles();
    const [article, setArticle] = useState(null);
    const [copied, setCopied] = useState(false);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        // Find article by ID or slug
        const foundArticle = articles.find(a =>
            a.id === parseInt(id) || a.slug === id
        );

        if (foundArticle) {
            setArticle(foundArticle);
            // Find related articles from same category
            const related = articles.filter(a =>
                a.categoryId === foundArticle.categoryId &&
                a.id !== foundArticle.id &&
                a.status === 'PUBLISHED'
            ).slice(0, 3);
            setRelatedArticles(related);
        }
    }, [id, articles]);

    const handleShare = async (platform) => {
        const url = window.location.href;
        const text = article?.title || 'Check this article';

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

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Article Not Found</h1>
                <p className="text-slate-600 dark:text-slate-400">The article you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
                >
                    ← Back to Home
                </button>
            </div>
        );
    }

    const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
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
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors font-medium"
                >
                    <ArrowLeft size={20} />
                    {language === 'hi' ? 'वापस जाएं' : 'BACK TO HOME'}
                </button>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-4 pb-32">
                {/* Category */}
                <Link
                    to={`/category/${article.category?.slug || 'news'}`}
                    className="inline-block text-xs font-black text-red-600 uppercase tracking-widest mb-4 hover:underline"
                >
                    {article.category?.name || 'NEWS'}
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-8 font-serif">
                    {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                            {article.author?.image ? (
                                <img src={article.author.image} alt={article.author.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={24} className="text-slate-500" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">{article.author?.name || 'Mitaan Team'}</p>
                            <p className="text-sm text-slate-500">{formattedDate} • 5 MIN READ</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 ml-auto">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                            <Eye size={16} /> {article.views || 0}
                        </button>
                        <button
                            onClick={() => handleShare('copy')}
                            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                            {copied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
                        </button>
                        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>

                {/* Featured Image */}
                {article.image && (
                    <div className="rounded-3xl overflow-hidden mb-10 shadow-2xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-auto max-h-[500px] object-cover"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?auto=format&fit=crop&q=80&w=2000';
                            }}
                        />
                    </div>
                )}

                {/* Ad Space - Article Top */}
                <AdSpace position="article_top" />

                {/* Short Description */}
                {article.shortDescription && (
                    <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium border-l-4 border-red-600 pl-6">
                        {article.shortDescription}
                    </p>
                )}

                {/* Article Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-red-600"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Video if exists */}
                {article.videoUrl && (
                    <div className="mt-10 rounded-2xl overflow-hidden bg-slate-900">
                        <div className="aspect-video">
                            <iframe
                                src={article.videoUrl.replace('watch?v=', 'embed/')}
                                className="w-full h-full"
                                allowFullScreen
                                title={article.title}
                            />
                        </div>
                    </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
                        {article.tags.map(tag => (
                            <Link
                                key={tag.id}
                                to={`/tag/${tag.slug}`}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            >
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Share Section */}
                <div className="flex items-center gap-4 mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Share:</span>
                    <button
                        onClick={() => handleShare('facebook')}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <Facebook size={18} />
                    </button>
                    <button
                        onClick={() => handleShare('twitter')}
                        className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    >
                        <Twitter size={18} />
                    </button>
                    <button
                        onClick={() => handleShare('linkedin')}
                        className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                    >
                        <Linkedin size={18} />
                    </button>
                </div>

                {/* Ad Space - Bottom Content */}
                <AdSpace position="article_bottom" />

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">
                            {language === 'hi' ? 'संबंधित लेख' : 'Related Articles'}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedArticles.map(related => (
                                <Link
                                    key={related.id}
                                    to={`/article/${related.id}`}
                                    className="group"
                                >
                                    <div className="rounded-2xl overflow-hidden mb-4">
                                        <img
                                            src={related.image || 'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?auto=format&fit=crop&q=80&w=400'}
                                            alt={related.title}
                                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2">
                                        {related.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <CommentsSection articleId={article.id} language={language} />
            </article>
        </motion.div>
    );
};

export default ArticleDetailPage;
