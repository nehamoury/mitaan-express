import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import ArticleList from './admin/ArticleList';

import ArticleEditor from './admin/ArticleEditor';
import Settings from './admin/Settings';
import Categories from './admin/Categories';
import { Menu } from 'lucide-react';

import MediaLibrary from './admin/MediaLibrary';
import Comments from './admin/Comments';
import Analytics from './admin/Analytics';
import ActivityLogs from './admin/ActivityLogs';
import Users from './admin/Users';
import MyBlogs from './admin/MyBlogs';
import FeaturedContent from './admin/FeaturedContent';

// Placeholders




const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [theme, setTheme] = useState(() => localStorage.getItem('adminTheme') || 'light');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            // Don't auto-redirect here, let the render handle it by showing login
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('adminTheme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setIsAuthenticated(false);
        navigate('/admin');
    };

    if (!isAuthenticated) {
        return <AdminLogin setToken={setToken} />;
    }

    // Main Layout for authenticated users
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] flex transition-colors duration-300 font-sans">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                handleLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
            />

            <main className="flex-1 min-w-0 overflow-y-auto h-screen relative">
                {/* Mobile Header */}
                <div className="lg:hidden p-4 flex items-center justify-between border-b border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-sm">M</div>
                        <span className="font-bold text-slate-900 dark:text-white">Admin</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-400">
                        <Menu size={24} />
                    </button>
                </div>

                <div className="max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/articles" element={<ArticleList />} />
                        <Route path="/articles/category/:categoryId" element={<ArticleList />} />
                        <Route path="/my-blogs" element={<MyBlogs />} />
                        <Route path="/articles/new" element={<ArticleEditor />} />
                        <Route path="/articles/edit/:id" element={<ArticleEditor />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/comments" element={<Comments />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/activity" element={<ActivityLogs />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/featured" element={<FeaturedContent />} />
                        <Route path="/media" element={<MediaLibrary />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
