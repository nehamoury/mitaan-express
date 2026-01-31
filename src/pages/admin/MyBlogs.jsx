import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, Edit, Eye, Filter, CheckSquare, Square, Search } from 'lucide-react';
import { fetchCategories, fetchArticles } from '../../services/api';

const MyBlogs = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedArticles, setSelectedArticles] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Fetch articles filtered by current user's ID
            if (user.id) {
                const data = await fetchArticles('', '', user.id);
                setArticles(data || []);
            }
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/articles/${slug}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                loadData();
                alert('Article deleted!');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || article.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) return <div className="p-8 text-center text-slate-500">Loading your blogs...</div>;
    if (!user.id) return <div className="p-8 text-center text-red-500">Please login to view your blogs</div>;

    return (
        <div className="p-4 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">My Blogs</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage your personal articles and drafts
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/articles/new')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
                >
                    <FileText size={18} />
                    Write New Blog
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search your blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 ring-red-600 text-slate-900 dark:text-white"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 ring-red-600 text-slate-900 dark:text-white font-bold text-sm"
                >
                    <option value="ALL">All Status</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                </select>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredArticles.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                        You haven't written any blogs yet.
                                    </td>
                                </tr>
                            ) : (
                                filteredArticles.map(article => (
                                    <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {article.image && (
                                                    <img src={article.image} alt="" className="w-12 h-12 object-cover rounded" />
                                                )}
                                                <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                                    {article.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
                                                {article.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${article.status === 'PUBLISHED'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                                                }`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            {article.views || 0}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/articles/edit/${article.slug}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(article.slug)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBlogs;
