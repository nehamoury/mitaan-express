import React, { createContext, useContext, useState, useEffect } from 'react';

const ArticlesContext = createContext();

export const useArticles = () => {
    const context = useContext(ArticlesContext);
    if (!context) {
        throw new Error('useArticles must be used within ArticlesProvider');
    }
    return context;
};

export const ArticlesProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [articlesRes, categoriesRes] = await Promise.all([
                fetch('http://localhost:3000/api/articles'),
                fetch('http://localhost:3000/api/categories')
            ]);

            if (!articlesRes.ok || !categoriesRes.ok) throw new Error('Failed to fetch data');

            const [articlesData, categoriesData] = await Promise.all([
                articlesRes.json(),
                categoriesRes.json()
            ]);

            setArticles(articlesData);
            setCategories(categoriesData);
            setError(null);
        } catch (e) {
            console.error("Failed to fetch data in ArticlesProvider", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Derived data - computed once, used everywhere
    const featured = articles.filter(a => a.isFeatured && a.status === 'PUBLISHED');
    const trending = articles.filter(a => a.isTrending && a.status === 'PUBLISHED');
    const breaking = articles.filter(a => a.isBreaking && a.status === 'PUBLISHED');
    const videos = articles.filter(a => a.videoUrl && a.status === 'PUBLISHED');
    const published = articles.filter(a => a.status === 'PUBLISHED');

    const refetch = () => fetchData();

    return (
        <ArticlesContext.Provider value={{
            articles,
            categories,
            featured,
            trending,
            breaking,
            videos,
            published,
            loading,
            error,
            refetch
        }}>
            {children}
        </ArticlesContext.Provider>
    );
};

export default ArticlesContext;
