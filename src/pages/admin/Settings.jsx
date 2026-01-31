import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../../services/api';
import { Save, Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Image, Type } from 'lucide-react';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [settings, setSettings] = useState({
        site_title: '',
        site_description: '',
        logo_url: '',
        footer_text: '',
        contact_email: '',
        contact_phone: '',
        contact_address: '',
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_youtube: '',
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setInitialLoading(true);
        const data = await fetchSettings();
        if (data) {
            setSettings(prev => ({ ...prev, ...data }));
        }
        setInitialLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            await updateSettings(token, settings);
            alert('Settings updated successfully!');
        } catch (error) {
            alert('Failed to update settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    return (
        <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Website Settings</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage global site configuration</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-600/30"
                >
                    <Save size={18} />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
                            <Globe className="text-red-500" /> General Info
                        </h3>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Site Title</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="site_title"
                                    value={settings.site_title}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="Mitaan Express"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Site Description (SEO)</label>
                            <textarea
                                name="site_description"
                                value={settings.site_description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                placeholder="Leading news portal..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Logo URL</label>
                            <div className="relative">
                                <Image className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="logo_url"
                                    value={settings.logo_url}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Footer Text</label>
                            <input
                                name="footer_text"
                                value={settings.footer_text}
                                onChange={handleChange}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                placeholder="© 2026 Mitaan Express. All rights reserved."
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
                            <Phone className="text-green-500" /> Contact Info
                        </h3>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="contact_email"
                                    value={settings.contact_email}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="contact@mitaan.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="contact_phone"
                                    value={settings.contact_phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <textarea
                                    name="contact_address"
                                    value={settings.contact_address}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="Raipur, Chhattisgarh, India"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
                            <Facebook className="text-blue-600" /> Social Media
                        </h3>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Facebook URL</label>
                            <div className="relative">
                                <Facebook className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="social_facebook"
                                    value={settings.social_facebook}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Twitter (X) URL</label>
                            <div className="relative">
                                <Twitter className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="social_twitter"
                                    value={settings.social_twitter}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Instagram URL</label>
                            <div className="relative">
                                <Instagram className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="social_instagram"
                                    value={settings.social_instagram}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">YouTube URL</label>
                            <div className="relative">
                                <Youtube className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    name="social_youtube"
                                    value={settings.social_youtube}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
