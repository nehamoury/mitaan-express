import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Mail, User, MessageSquare, Calendar, ChevronDown, Filter, Search } from 'lucide-react';

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/donations', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setDonations(data);
            }
        } catch (error) {
            console.error('Failed to fetch donations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDonations = donations.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-8 space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Contributions</span>
                    <div className="text-4xl font-black text-slate-900 dark:text-white font-serif italic flex items-center gap-2">
                        <IndianRupee size={28} className="text-red-600" />
                        {totalAmount.toLocaleString()}
                    </div>
                </div>
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-8 space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Donors</span>
                    <div className="text-4xl font-black text-slate-900 dark:text-white font-serif italic">
                        {donations.length}
                    </div>
                </div>
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-8 space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Donation</span>
                    <div className="text-4xl font-black text-slate-900 dark:text-white font-serif italic">
                        ₹{(totalAmount / (donations.length || 1)).toFixed(0)}
                    </div>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search donors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all dark:text-white"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                    <Filter size={16} />
                    Filter Records
                </button>
            </div>

            {/* Donations Table */}
            <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/10">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Donor</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">Loading donations...</td>
                                </tr>
                            ) : filteredDonations.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">No donations found</td>
                                </tr>
                            ) : (
                                filteredDonations.map((donation) => (
                                    <tr key={donation.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white">{donation.name}</span>
                                                <span className="text-xs text-slate-500">{donation.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-mono font-bold text-red-600">₹{donation.amount}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate" title={donation.message}>
                                                {donation.message || '-'}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(donation.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {donation.status}
                                            </span>
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

export default AdminDonations;
