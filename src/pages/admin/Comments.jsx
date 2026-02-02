import React, { useState } from 'react';
import { MessageSquare, Check, X, AlertTriangle, Trash2 } from 'lucide-react';
import { useAdminComments } from '../../hooks/useQueries';

const Comments = () => {
    const [filter, setFilter] = useState('PENDING'); // PENDING, APPROVED, REJECTED, SPAM, ALL
    const [selectedComment, setSelectedComment] = useState(null);

    // TanStack Query Hook
    const {
        data: comments = [],
        isLoading: loading,
        refetch: loadComments
    } = useAdminComments(filter);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/comments/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadComments();
                alert('Comment approved!');
            }
        } catch (error) {
            console.error('Failed to approve:', error);
        }
    };

    const handleReject = async (id, reason) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/comments/${id}/reject`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason })
            });

            if (response.ok) {
                loadComments();
                alert('Comment rejected!');
            }
        } catch (error) {
            console.error('Failed to reject:', error);
        }
    };

    const handleMarkSpam = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/comments/${id}/spam`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadComments();
                alert('Marked as spam!');
            }
        } catch (error) {
            console.error('Failed to mark spam:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                loadComments();
                alert('Comment deleted!');
            }
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
            SPAM: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
        };
        return badges[status] || '';
    };

    const stats = {
        total: comments.length,
        pending: comments.filter(c => c.status === 'PENDING').length,
        approved: comments.filter(c => c.status === 'APPROVED').length,
        spam: comments.filter(c => c.status === 'SPAM').length
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading comments...</div>;

    return (
        <div className="p-4 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Comment Moderation</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Review and manage user comments</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/5">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/20">
                    <div className="text-2xl font-black text-yellow-800 dark:text-yellow-400">{stats.pending}</div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 uppercase tracking-wide">Pending</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-900/20">
                    <div className="text-2xl font-black text-green-800 dark:text-green-400">{stats.approved}</div>
                    <div className="text-xs text-green-600 dark:text-green-500 uppercase tracking-wide">Approved</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-200 dark:border-orange-900/20">
                    <div className="text-2xl font-black text-orange-800 dark:text-orange-400">{stats.spam}</div>
                    <div className="text-xs text-orange-600 dark:text-orange-500 uppercase tracking-wide">Spam</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'SPAM'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === status
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No comments found</p>
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold">
                                            {(comment.name || comment.user?.name || 'A')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white">
                                                {comment.name || comment.user?.name || 'Anonymous'}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {comment.email || comment.user?.email}
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(comment.status)}`}>
                                            {comment.status}
                                        </span>
                                        {comment.isSpam && (
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                                                SPAM DETECTED
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 mb-2">{comment.content}</p>
                                    <div className="text-xs text-slate-500">
                                        On: <span className="font-bold">{comment.article?.title}</span> • {new Date(comment.createdAt).toLocaleDateString()}
                                    </div>
                                    {comment.rejectionReason && (
                                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg text-sm text-red-600 dark:text-red-400">
                                            <strong>Rejection Reason:</strong> {comment.rejectionReason}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                                {comment.status === 'PENDING' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(comment.id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-all flex items-center gap-2"
                                        >
                                            <Check size={16} /> Approve
                                        </button>
                                        <button
                                            onClick={() => {
                                                const reason = prompt('Rejection reason (optional):');
                                                handleReject(comment.id, reason || 'No reason provided');
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-all flex items-center gap-2"
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                        <button
                                            onClick={() => handleMarkSpam(comment.id)}
                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold text-sm hover:bg-orange-700 transition-all flex items-center gap-2"
                                        >
                                            <AlertTriangle size={16} /> Mark Spam
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="px-4 py-2 bg-slate-600 text-white rounded-lg font-bold text-sm hover:bg-slate-700 transition-all flex items-center gap-2"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;
