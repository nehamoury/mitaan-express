import React, { useEffect, useState } from 'react';
import { fetchStats } from '../../services/api';
import { BarChart3, TrendingUp, FileText, Activity, Eye, MessageSquare, Users as UsersIcon, Clock, Zap, Globe } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [realtimeViews, setRealtimeViews] = useState(0);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    setLoading(false);
                    return;
                }

                console.log('Fetching stats...');
                const data = await fetchStats(token);
                console.log('Stats received:', data);

                if (data) {
                    setStats(data);
                } else {
                    console.error('No data received');
                }
            } catch (error) {
                console.error('Dashboard load error:', error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();

        // Simulate real-time views counter
        const interval = setInterval(() => {
            setRealtimeViews(prev => prev + Math.floor(Math.random() * 5));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;

    if (!stats) {
        return (
            <div className="space-y-8">
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="text-yellow-600 dark:text-yellow-400 font-black text-lg">⚠️ Authentication Required</div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        Unable to load dashboard stats. Please log out and log in again.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/admin/login';
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                        >
                            Re-login
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Chart data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const viewsData = {
        labels: last7Days,
        datasets: [
            {
                label: 'Page Views',
                data: [1200, 1900, 1500, 2100, 1800, 2400, 2800],
                borderColor: 'rgb(220, 38, 38)',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const categoryData = {
        labels: stats.categoryCounts?.slice(0, 5).map(cat => cat.name) || [],
        datasets: [
            {
                label: 'Articles',
                data: stats.categoryCounts?.slice(0, 5).map(cat => cat.count) || [],
                backgroundColor: [
                    'rgba(220, 38, 38, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                ],
            },
        ],
    };

    const statusData = {
        labels: ['Published', 'Draft', 'Trending'],
        datasets: [
            {
                data: [stats.publishedArticles, stats.draftArticles, stats.trendingCount],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(251, 146, 60, 0.8)',
                    'rgba(220, 38, 38, 0.8)',
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const cards = [
        { title: 'Total Articles', value: stats.totalArticles, icon: <FileText className="text-blue-500" />, color: 'from-blue-500 to-blue-600', change: '+12%' },
        { title: 'Total Views', value: stats.totalViews.toLocaleString(), icon: <Eye className="text-purple-500" />, color: 'from-purple-500 to-purple-600', change: '+23%' },
        { title: 'Published', value: stats.publishedArticles, icon: <TrendingUp className="text-green-500" />, color: 'from-green-500 to-green-600', change: '+8%' },
        { title: 'Breaking News', value: stats.breakingCount, icon: <Zap className="text-red-500" />, color: 'from-red-500 to-red-600', change: 'Live' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Dashboard Overview</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Welcome to Mitaan Express Admin Panel</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-900/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-green-700 dark:text-green-400">Live: {realtimeViews} views today</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.title}</span>
                                <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                                    {card.icon}
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{card.value}</h3>
                                <span className="text-xs font-bold text-green-600 dark:text-green-400">{card.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Views Trend */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-900 dark:text-white text-lg flex items-center gap-2">
                            <TrendingUp className="text-red-600" size={20} />
                            Views Trend (7 Days)
                        </h3>
                    </div>
                    <div className="h-64">
                        <Line data={viewsData} options={chartOptions} />
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-900 dark:text-white text-lg flex items-center gap-2">
                            <BarChart3 className="text-red-600" size={20} />
                            Top Categories
                        </h3>
                    </div>
                    <div className="h-64">
                        <Bar data={categoryData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Article Status */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
                        <Activity className="text-red-600" size={20} />
                        Article Status
                    </h3>
                    <div className="h-48">
                        <Doughnut data={statusData} options={doughnutOptions} />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg mb-6">Quick Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                            <span className="text-slate-600 dark:text-slate-400 text-sm">Published</span>
                            <span className="font-black text-slate-900 dark:text-white">{stats.publishedArticles}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                            <span className="text-slate-600 dark:text-slate-400 text-sm">Drafts</span>
                            <span className="font-black text-slate-900 dark:text-white">{stats.draftArticles}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                            <span className="text-slate-600 dark:text-slate-400 text-sm">Trending</span>
                            <span className="font-black text-slate-900 dark:text-white">{stats.trendingCount}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                            <span className="text-slate-600 dark:text-slate-400 text-sm">Today's News</span>
                            <span className="font-black text-slate-900 dark:text-white">{stats.todayArticles}</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
                        <Clock className="text-red-600" size={20} />
                        Recent Activity
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">New article published</p>
                                <p className="text-xs text-slate-500">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Comment approved</p>
                                <p className="text-xs text-slate-500">15 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Category updated</p>
                                <p className="text-xs text-slate-500">1 hour ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Breaking news added</p>
                                <p className="text-xs text-slate-500">3 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
