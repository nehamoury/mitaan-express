import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Reply, MoreHorizontal, Send, User } from 'lucide-react';
import { usePublicComments } from '../hooks/useQueries';
import { useCreateComment } from '../hooks/useMutations';

const CommentsSection = ({ articleId, blogId, language }) => {
    const [newComment, setNewComment] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [error, setError] = useState(null);

    // TanStack Query Hooks
    const {
        data: comments = [],
        isLoading: loading
    } = usePublicComments({ articleId, blogId });

    const mutation = useCreateComment();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await mutation.mutateAsync({
                content: newComment,
                articleId: articleId || null,
                blogId: blogId || null,
                guestName: guestName || 'Guest User',
                guestEmail: guestEmail || 'guest@example.com'
            });

            setNewComment('');
            setGuestName('');
            setGuestEmail('');
            setError(null);
        } catch (e) {
            console.error("Submission error:", e);
            setError("Failed to post comment. Please try again.");
        }
    };

    const submitting = mutation.isPending;

    const formatTime = (date) => {
        const diff = Date.now() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return language === 'hi' ? 'अभी अभी' : 'Just now';
        if (hours < 24) return `${hours} ${language === 'hi' ? 'घंटे पहले' : 'hours ago'}`;
        const days = Math.floor(hours / 24);
        return `${days} ${language === 'hi' ? 'दिन पहले' : 'days ago'}`;
    };

    return (
        <section className="mt-24 pt-16 border-t border-slate-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black font-serif">
                            {language === 'hi' ? 'टिप्पणियाँ' : 'Discussion'}
                        </h3>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            {comments.length} {language === 'hi' ? 'प्रतिक्रियाएं' : 'Responses'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="mb-16 space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder={language === 'hi' ? 'आपका नाम' : 'Your Name'}
                        className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-red-600/50 transition-all"
                    />
                    <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder={language === 'hi' ? 'आपका ईमेल (optional)' : 'Your Email (optional)'}
                        className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-red-600/50 transition-all"
                    />
                </div>

                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10 overflow-hidden">
                        <User size={24} className="text-slate-400" />
                    </div>
                    <div className="flex-1 relative group">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={language === 'hi' ? 'अपनी राय दें...' : 'Add to the discussion...'}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-sm font-medium outline-none focus:border-red-600/50 focus:ring-4 focus:ring-red-600/5 transition-all min-h-[120px] resize-none"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim() || submitting}
                            className="absolute bottom-4 right-4 bg-red-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Send size={14} />
                            {submitting ? (language === 'hi' ? 'भेज रहे...' : 'Posting...') : (language === 'hi' ? 'पोस्ट करें' : 'Post')}
                        </button>
                    </div>
                </div>
            </form>

            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
                </div>
            )}

            {!loading && (
                <div className="space-y-12">
                    <AnimatePresence initial={false}>
                        {comments.map((comment, idx) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-black/5 ring-1 ring-black/5 bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                        {(comment.user?.name || comment.guestName || 'G').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">
                                                    {comment.user?.name || comment.guestName || 'Guest User'}
                                                </h4>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                                    {formatTime(comment.createdAt)}
                                                    {comment.status === 'PENDING' && (
                                                        <span className="ml-2 text-amber-500">• Pending approval</span>
                                                    )}
                                                </p>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>

                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm font-medium bg-slate-50 dark:bg-white/5 p-5 rounded-2xl rounded-tl-none inline-block min-w-[200px]">
                                            {comment.content}
                                        </p>

                                        <div className="flex items-center gap-6">
                                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors group/btn">
                                                <Heart size={14} className="group-hover/btn:fill-current" />
                                                {language === 'hi' ? 'पसंद' : 'Like'}
                                            </button>
                                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors">
                                                <Reply size={14} />
                                                {language === 'hi' ? 'जवाब' : 'Reply'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {comments.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="font-medium">
                                {language === 'hi' ? 'कोई टिप्पणी नहीं है। पहले बनें!' : 'No comments yet. Be the first!'}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default CommentsSection;
