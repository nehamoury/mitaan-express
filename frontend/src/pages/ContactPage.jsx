import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../hooks/useQueries';

const ContactPage = ({ language }) => {
    const { data: settings } = useSettings();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { createContact } = await import('../services/api');
            await createContact(formData);
            setLoading(false);
            setShowSuccess(true);
            setFormData({ name: '', email: '', subject: 'General Inquiry', phone: '', message: '' });
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Contact submit error:', error);
            setLoading(false);
            alert(language === 'hi' ? 'त्रुटि: संदेश भेजने में विफल' : 'Error: Failed to send message');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors pb-32 overflow-hidden selection:bg-red-600 selection:text-white">
            {/* Background Sophistication */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] dark:bg-red-900/10"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px] dark:bg-blue-900/5"></div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-20 scale-105"
                        alt="Contact Us"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-[#020617]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <span className="inline-block px-4 py-1 rounded-full border border-red-600/20 bg-red-600/5 text-red-600 font-bold text-[10px] uppercase tracking-[0.4em]">
                            {language === 'hi' ? 'हमसे संपर्क करें' : 'GET IN TOUCH'}
                        </span>
                        <h1 className="text-4xl md:text-9xl font-black text-white font-serif tracking-tighter leading-[0.9]">
                            {language === 'hi' ? 'आपकी आवाज़' : "Let's Start a"} <br />
                            <span className="text-red-600 italic">{language === 'hi' ? 'हमारे लिए महत्वपूर्ण है' : 'Conversation'}</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Decorative Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 -mt-10">
                {/* Visual Connector */}
                <div className="flex justify-center mb-10">
                    <div className="w-16 h-2 bg-red-600 rounded-full"></div>
                </div>

                {/* Info Cards - Glassmorphic Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        {
                            icon: <Phone size={24} />,
                            label: language === 'hi' ? 'फोन' : 'Phone',
                            value: settings?.contact_phone || '+91 11 2345 6789',
                            href: `tel:${settings?.contact_phone || '+911123456789'}`,
                            delay: 0.1
                        },
                        {
                            icon: <Mail size={24} />,
                            label: language === 'hi' ? 'ईमेल' : 'Email',
                            value: settings?.contact_email || 'contact@mitaanexpress.in',
                            href: `mailto:${settings?.contact_email || 'contact@mitaanexpress.in'}`,
                            delay: 0.2
                        },
                        {
                            icon: <MapPin size={24} />,
                            label: language === 'hi' ? 'कार्यालय' : 'Office',
                            value: settings?.contact_address || 'New Delhi, India',
                            href: '#',
                            delay: 0.3
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative bg-white/70 dark:bg-white/[0.03] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 flex flex-col items-center text-center space-y-6 hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                                <div className="w-16 h-16 bg-white dark:bg-white/5 text-red-600 rounded-3xl flex items-center justify-center shadow-xl border border-slate-100 dark:border-white/10 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60 group-hover:text-red-600 transition-colors">{item.label}</p>
                                    <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white font-serif tracking-tight">{item.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Form Card - Modern wide design */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative bg-white dark:bg-white/[0.02] rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden border border-slate-100 dark:border-white/5"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Elegant Sidebar Part */}
                        <div className="lg:col-span-4 bg-gradient-to-br from-red-600 to-red-700 p-16 md:p-20 text-white flex flex-col justify-between relative overflow-hidden">
                            {/* Sophisticated Pattern */}
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none scale-[1.5]">
                                <Send size={300} strokeWidth={0.5} />
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                                <h3 className="text-3xl md:text-5xl font-black font-serif italic leading-tight">
                                    {language === 'hi' ? 'संदेश भेजें' : 'Share your Thoughts'}
                                </h3>
                                <p className="text-white/80 text-sm md:text-lg font-medium leading-relaxed">
                                    {language === 'hi'
                                        ? 'हर कहानी का एक हिस्सा बनें। हम आपकी बात सुनने के लिए बेताब हैं।'
                                        : 'Be part of every story. We are eager to hear your perspective and insights.'}
                                </p>
                            </div>

                            <div className="relative z-10 space-y-8 pt-20">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Connect</p>
                                <div className="flex gap-4">
                                    {['FB', 'TW', 'IG', 'YT'].map((s) => (
                                        <a key={s} href="#" className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] font-black hover:bg-white hover:text-red-600 transition-all duration-300">
                                            {s}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modern Form Part */}
                        <div className="lg:col-span-8 p-12 md:p-16 lg:p-24 relative bg-transparent">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-red-600 transition-colors">{language === 'hi' ? 'पूरा नाम' : 'FULL NAME'}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 px-0 py-4 text-base font-medium outline-none focus:border-red-600 dark:focus:border-red-600 transition-all duration-500 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-red-600 transition-colors">{language === 'hi' ? 'ईमेल एड्रेस' : 'EMAIL ADDRESS'}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 px-0 py-4 text-base font-medium outline-none focus:border-red-600 dark:focus:border-red-600 transition-all duration-500 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-red-600 transition-colors">{language === 'hi' ? 'विषय' : 'SUBJECT'}</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 px-0 py-4 text-base font-medium outline-none focus:border-red-600 dark:focus:border-red-600 transition-all duration-500 appearance-none bg-transparent"
                                    >
                                        <option value="General Inquiry">{language === 'hi' ? 'सामान्य पूछताछ' : 'General Inquiry'}</option>
                                        <option value="Advertising">{language === 'hi' ? 'एडवरटाइजिंग' : 'Advertising'}</option>
                                        <option value="Submit a Story">{language === 'hi' ? 'कहानी सबमिट करें' : 'Submit a Story'}</option>
                                    </select>
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-red-600 transition-colors">{language === 'hi' ? 'फोन नंबर' : 'PHONE NUMBER'}</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 00000 00000"
                                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 px-0 py-4 text-base font-medium outline-none focus:border-red-600 dark:focus:border-red-600 transition-all duration-500 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-4 group pt-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-red-600 transition-colors">{language === 'hi' ? 'आपका संदेश' : 'YOUR MESSAGE'}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder={language === 'hi' ? 'हम आपकी कैसे मदद कर सकते हैं?' : 'How can we help you?'}
                                        required
                                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/10 px-0 py-4 text-base font-medium outline-none focus:border-red-600 dark:focus:border-red-600 transition-all duration-700 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div className="md:col-span-2 pt-10">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative group/btn h-14 w-max"
                                    >
                                        <div className="absolute inset-0 bg-red-600 rounded-2xl blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity"></div>
                                        <div className="relative h-full flex items-center gap-4 px-8 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 disabled:opacity-50">
                                            {loading ? (language === 'hi' ? 'भेज रहा है...' : 'SENDING...') : (language === 'hi' ? 'संदेश भेजें' : 'SEND MESSAGE')}
                                            {!loading && <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform duration-500" />}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Support Info - Refined Cards */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: <MessageSquare className="text-red-600" />, title: language === 'hi' ? 'लाइव चैट' : 'Live Chat', desc: 'Saturdays & Sundays are closed', action: 'Start Chat' },
                    { icon: <Globe className="text-red-600" />, title: language === 'hi' ? 'ग्लोबल सपोर्ट' : 'Global Support', desc: 'Available in 15+ countries', action: 'View Locations' },
                    { icon: <Clock className="text-red-600" />, title: language === 'hi' ? 'कार्य समय' : 'Working Hours', desc: 'Mon-Fri: 9:00 AM - 6:00 PM', action: 'Schedule Call' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/40 dark:bg-white/[0.01] backdrop-blur-xl p-12 rounded-[3.5rem] border border-slate-200/50 dark:border-white/5 text-center space-y-6 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] flex items-center justify-center mx-auto transition-transform group-hover:rotate-[360deg] duration-1000">
                            {item.icon}
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white font-serif">{item.title}</h4>
                            <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                        </div>
                        <button className="text-red-600 font-black text-[10px] uppercase tracking-[0.2em] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-red-600 after:transition-all hover:after:w-full">
                            {item.action}
                        </button>
                    </motion.div>
                ))}
            </section>

            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 20 }}
                            className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] text-center space-y-6 shadow-2xl border border-white/10"
                        >
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="text-green-600" size={48} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black font-serif italic text-slate-900 dark:text-white">
                                    {language === 'hi' ? 'संदेश भेजा गया!' : 'Message Sent!'}
                                </h3>
                                <p className="text-slate-500 font-medium">
                                    {language === 'hi' ? 'जल्द ही हमारी टीम आपसे संपर्क करेगी।' : 'Our team will get back to you shortly.'}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactPage;
