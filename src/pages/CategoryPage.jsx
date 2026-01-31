import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import { useArticles } from '../context/ArticlesContext';
import { LoadingSpinner } from '../components/LoadingSkeletons';

const CategoryPage = ({ language }) => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { published, loading, categories } = useArticles();

    // Find the current category object from context
    const currentCategory = useMemo(() => {
        return categories.find(c => c.slug === categoryId);
    }, [categoryId, categories]);

    // Handle hierarchical filtering:
    // If it's a sub-category, show its articles.
    // If it's a parent category, show articles from all children.
    const filteredArticles = useMemo(() => {
        if (!currentCategory) return [];

        return published.filter(a => {
            // Match directly
            if (a.category?.id === currentCategory.id) return true;

            // Match if it's a child of this category
            if (a.category?.parentId === currentCategory.id) return true;

            return false;
        }).map(a => ({
            id: a.id,
            title: a.title,
            description: a.shortDescription || a.content?.substring(0, 150) + '...' || '',
            image: a.image || 'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?auto=format&fit=crop&q=80&w=2000',
            category: language === 'hi' ? (a.category?.nameHi || a.category?.name) : a.category?.name,
            author: a.author?.name || 'Mitaan',
            date: new Date(a.createdAt).toLocaleDateString(),
            slug: a.slug
        }));
    }, [categoryId, published, currentCategory, language]);

    const handleArticleClick = (articleId) => {
        navigate(`/article/${articleId}`);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const categoryTitle = currentCategory
        ? (language === 'hi' ? currentCategory.nameHi : currentCategory.name)
        : categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 pt-12 md:pt-20"
        >
            <div className="max-w-7xl mx-auto px-6 pt-32">
                {/* Category Header */}
                <div className="mb-16 border-b border-slate-100 dark:border-white/5 pb-12">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-4 block">
                        {language === 'hi' ? 'श्रेणी' : 'CATEGORY'}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
                        {categoryTitle}
                    </h1>
                    <div className="flex items-center gap-6 mt-8">
                        <p className="text-slate-500 font-bold text-sm">
                            {filteredArticles.length} {language === 'hi' ? 'लेख' : 'articles'}
                        </p>
                        {currentCategory?.parentId && (
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="text-slate-400 text-sm font-medium">Part of {currentCategory.parent?.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="flex-1 space-y-12">
                        <div className="grid gap-16">
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article, i) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => handleArticleClick(article.id)}
                                        className="cursor-pointer"
                                    >
                                        <ArticleCard
                                            article={article}
                                            language={language}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-32 text-center bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10">
                                    <div className="text-7xl mb-6 grayscale opacity-50">📰</div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                        {language === 'hi' ? 'अभी कोई कहानियां नहीं' : 'No stories found'}
                                    </h3>
                                    <p className="text-slate-500 font-medium">
                                        {language === 'hi'
                                            ? 'इस श्रेणी में अभी कोई लेख नहीं है।'
                                            : 'We are working on bringing stories to this category.'}
                                    </p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="mt-8 px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
                                    >
                                        {language === 'hi' ? 'होम पर जाएं' : 'Back to Home'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-[420px] shrink-0">
                        <Sidebar language={language} showWeather={false} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryPage;
