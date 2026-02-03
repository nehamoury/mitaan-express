import React, { useEffect, useState } from 'react';

const AdSpace = ({ position = 'homepage_top', className = '' }) => {
    const [adCode, setAdCode] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdSettings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/settings');
                const settings = await response.json();

                const codeKey = `ad_${position}_code`;
                const enabledKey = `ad_${position}_enabled`;

                setAdCode(settings[codeKey] || '');
                setIsEnabled(settings[enabledKey] === 'true');
            } catch (error) {
                console.error('Failed to fetch ad settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdSettings();
    }, [position]);

    if (loading) {
        return (
            <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden my-8 w-full h-24 md:h-32 ${className}`}>
                <div className="animate-spin w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Mock Ads (House Ads) to show when real ads are missing
    const mockAds = [
        {
            bg: "bg-gradient-to-r from-indigo-900 to-slate-900",
            title: "Advertise With Mitaan Express",
            subtitle: "Reach millions of readers daily.",
            cta: "Contact Us",
            icon: "📢"
        },
        {
            bg: "bg-gradient-to-r from-red-900 to-red-600",
            title: "Download Our App",
            subtitle: "Get breaking news notifications instantly.",
            cta: "Download",
            icon: "📱"
        },
        {
            bg: "bg-gradient-to-r from-green-800 to-emerald-600",
            title: "Annual Subscription @ 50% Off",
            subtitle: "Limited time offer for premium access.",
            cta: "Subscribe",
            icon: "💎"
        }
    ];

    // Pick a random ad based on position string length to be consistent but pseudo-random
    const adIndex = position.length % mockAds.length;
    const ad = mockAds[adIndex];

    // If ads are disabled or no code, show a premium House Ad
    if (!isEnabled || !adCode) {
        return (
            <div className={`relative overflow-hidden ${ad.bg} rounded-xl shadow-lg my-12 w-full h-32 md:h-40 flex items-center justify-between px-8 md:px-12 group cursor-pointer hover:shadow-2xl transition-all duration-500 ${className}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>

                <div className="relative z-10 flex flex-col justify-center h-full">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Sponsored</span>
                    <h3 className="text-xl md:text-3xl font-black text-white font-serif italic">{ad.title}</h3>
                    <p className="text-white/70 text-sm font-medium mt-1">{ad.subtitle}</p>
                </div>

                <div className="relative z-10 hidden md:flex flex-col items-center gap-4">
                    <span className="text-4xl filter drop-shadow-lg">{ad.icon}</span>
                    <button className="px-6 py-2 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                        {ad.cta}
                    </button>
                </div>
            </div>
        );
    }

    // Render AdSense code
    return (
        <div
            className={`my-8 ${className}`}
            dangerouslySetInnerHTML={{ __html: adCode }}
        />
    );
};

export default AdSpace;
