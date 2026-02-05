import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, CreditCard, QrCode, CheckCircle2, IndianRupee } from 'lucide-react';

const DonationPage = ({ language }) => {
    const [method, setMethod] = useState('form'); // 'form' or 'qr'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, method: 'form' })
            });
            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', amount: '', message: '' });
            }
        } catch (error) {
            console.error('Donation error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex p-4 bg-red-600/10 text-red-600 rounded-full"
                    >
                        <Heart size={32} fill="currentColor" />
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white font-serif italic">
                        {language === 'hi' ? 'सहयोग करें' : 'Support Our Journalism'}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {language === 'hi'
                            ? 'मिथुन एक्सप्रेस को स्वतंत्र रखने में हमारी मदद करें। आपकी छोटी सी मदद हमें बेहतर पत्रकारिता करने की शक्ति देती है।'
                            : 'Help us keep Mitaan Express independent. Your contribution empowers us to continue delivering high-quality, unbiased journalism.'}
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[40px] shadow-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-100 dark:border-white/10">
                        <button
                            onClick={() => setMethod('form')}
                            className={`flex-1 py-6 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all ${method === 'form' ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            <CreditCard size={18} />
                            {language === 'hi' ? 'विवरण भरें' : 'With Details'}
                        </button>
                        <button
                            onClick={() => setMethod('qr')}
                            className={`flex-1 py-6 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all ${method === 'qr' ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            <QrCode size={18} />
                            {language === 'hi' ? 'QR कोड' : 'QR Code'}
                        </button>
                    </div>

                    <div className="p-8 md:p-12">
                        {method === 'form' ? (
                            submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10 space-y-6"
                                >
                                    <div className="flex justify-center text-green-500">
                                        <CheckCircle2 size={64} />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white font-serif italic">
                                        {language === 'hi' ? 'धन्यवाद!' : 'Thank You!'}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {language === 'hi' ? 'आपका योगदान सफलतापूर्वक दर्ज कर लिया गया है।' : 'Your contribution has been successfully recorded.'}
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                                    >
                                        {language === 'hi' ? 'एक और योगदान करें' : 'Make Another Donation'}
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Amount (INR)</label>
                                        <div className="relative">
                                            <IndianRupee size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="number"
                                                name="amount"
                                                required
                                                value={formData.amount}
                                                onChange={handleInputChange}
                                                placeholder="500"
                                                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Message (Optional)</label>
                                        <textarea
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Your message to us..."
                                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all dark:text-white resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-6 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 disabled:opacity-50"
                                    >
                                        {loading ? 'PROCESSING...' : (language === 'hi' ? 'अभी योगदान करें' : 'PROCEED TO PAY')}
                                    </button>
                                </form>
                            )
                        ) : (
                            <div className="flex flex-col items-center py-10 space-y-10">
                                <div className="p-8 bg-slate-50 dark:bg-white border-8 border-slate-100 dark:border-slate-800 rounded-[40px] shadow-2xl">
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=mitaanexpress@upi&pn=Mitaan%20Express&cu=INR"
                                        alt="UPI QR Code"
                                        className="w-64 h-64 mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                                <div className="text-center space-y-4">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Scan & Pay</h3>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                                        {language === 'hi'
                                            ? 'किसी भी UPI ऐप (Google Pay, PhonePe, Paytm) से स्कैन करें।'
                                            : 'Scan this QR code using any UPI app like Google Pay, PhonePe, or Paytm to contribute instantly.'}
                                    </p>
                                    <div className="flex items-center justify-center gap-4 pt-4">
                                        <span className="px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-full text-xs font-bold text-slate-500">UPI ID: mitaanexpress@upi</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* FAQ or Info */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl space-y-4">
                        <div className="text-red-600 bg-red-600/10 w-fit p-3 rounded-xl"><Coffee size={24} /></div>
                        <h4 className="font-bold dark:text-white">Transparent</h4>
                        <p className="text-sm text-slate-500">Every rupee is used to fund deep investigative reports and field journalism.</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl space-y-4">
                        <div className="text-red-600 bg-red-600/10 w-fit p-3 rounded-xl"><CreditCard size={24} /></div>
                        <h4 className="font-bold dark:text-white">Secure</h4>
                        <p className="text-sm text-slate-500">Your details are safe with us. We use industry-standard encryption for all transactions.</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl space-y-4">
                        <div className="text-red-600 bg-red-600/10 w-fit p-3 rounded-xl"><CheckCircle2 size={24} /></div>
                        <h4 className="font-bold dark:text-white">Impactful</h4>
                        <p className="text-sm text-slate-500">Join a community of 10,000+ supporters who believe in truth and integrity.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;
