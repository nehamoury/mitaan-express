import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import CursorTracker from './components/CursorTracker';
import BackToTop from './components/BackToTop';
import { ArticlesProvider } from './context/ArticlesContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/quill-custom.css';

import LoadingSkeletons from './components/LoadingSkeletons';

// Lazy Loaded Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const VideoPage = React.lazy(() => import('./pages/VideoPage'));
const PoetryPage = React.lazy(() => import('./pages/PoetryPage'));
const BlogsPage = React.lazy(() => import('./pages/BlogsPage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ArticleDetailPage = React.lazy(() => import('./pages/ArticleDetailPage'));
const BlogDetailPage = React.lazy(() => import('./pages/BlogDetailPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const DonationPage = React.lazy(() => import('./pages/DonationPage'));

const App = () => {
    const [language, setLanguage] = useState(() => localStorage.getItem('lang') || 'hi');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const location = useLocation();
    const navigate = useNavigate();

    // Determine active category based on URL for Navbar highlighting
    const activeCategory = useMemo(() => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path.startsWith('/category/')) return path.split('/')[2];
        if (path.startsWith('/article/')) return 'article';
        return path.substring(1) || 'home';
    }, [location.pathname]);

    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        // Prevent browser from restoring scroll position on refresh
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Simple title setting based on path
        const baseTitle = 'Mitaan Express';
        const pageTitles = {
            '/': 'Home',
            '/about': 'About Us',
            '/contact': 'Contact Us',
            '/gallery': 'Gallery',
            '/video': 'Videos',
            '/poetry': 'Poetry',
            '/blogs': 'Blog'
        };

        // This logic can be refined, but basic title update
        let pageTitle = pageTitles[location.pathname];
        if (!pageTitle && location.pathname.startsWith('/category/')) {
            const cat = location.pathname.split('/')[2];
            pageTitle = cat.charAt(0).toUpperCase() + cat.slice(1) + ' News';
        }

        if (pageTitle) {
            document.title = `${pageTitle} - ${baseTitle}`;
        }
    }, [location.pathname]);

    useEffect(() => {
        localStorage.setItem('lang', language);
    }, [language]);

    useEffect(() => {
        if (isAdminRoute) return; // Don't interfere with Admin theme
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme, isAdminRoute]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');

    // Navigation Handler for Navbar
    const handleCategoryChange = (id) => {
        if (id === 'home') navigate('/');
        else if (['about', 'contact', 'gallery', 'video', 'poetry', 'blogs'].includes(id)) navigate(`/${id}`);
        else navigate(`/category/${id}`);
        // Menu closing is handled inside Navbar usually, or Navbar will re-render
    };



    return (
        <ArticlesProvider>
            <div className={`min-h-screen ${theme} bg-white dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-red-600 selection:text-white`}>
                {!isAdminRoute && <CursorTracker />}
                {!isAdminRoute && (
                    <Navbar
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                        theme={theme}
                        toggleTheme={toggleTheme}
                        language={language}
                        toggleLanguage={toggleLanguage}
                    />
                )}

                <main className="relative">
                    <React.Suspense fallback={<LoadingSkeletons type="page" />}>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<HomePage language={language} />} />
                                <Route path="/about" element={<AboutPage language={language} />} />
                                <Route path="/contact" element={<ContactPage language={language} />} />
                                <Route path="/gallery" element={<GalleryPage language={language} />} />
                                <Route path="/video" element={<VideoPage language={language} />} />
                                <Route path="/poetry" element={<PoetryPage language={language} />} />
                                <Route path="/blogs" element={<BlogsPage language={language} />} />
                                <Route path="/category/:categoryId" element={<CategoryPage language={language} />} />
                                <Route path="/article/:id" element={<ArticleDetailPage language={language} />} />
                                <Route path="/blog/:slug" element={<BlogDetailPage language={language} />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/donate" element={<DonationPage language={language} />} />
                                <Route path="/admin/*" element={<AdminPage />} />
                            </Routes>
                        </AnimatePresence>
                    </React.Suspense>
                </main>

                {!isAdminRoute && (
                    <>
                        <BackToTop />
                        <Footer language={language} onCategoryChange={handleCategoryChange} />

                    </>
                )}
            </div>
        </ArticlesProvider>
    );
};

export default App;
