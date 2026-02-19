import React from 'react';
import { useSettings } from '../hooks/useQueries';
import AdBanner from './AdBanner';

const AdSpace = ({ position = 'homepage_top', className = '' }) => {
    const { data: settings, isLoading: loading } = useSettings();

    const imageUrl = settings?.[`ad_${position}_image_url`] || '';
    const linkUrl = settings?.[`ad_${position}_link_url`] || '';
    const isEnabled = settings?.[`ad_${position}_enabled`] === 'true';

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

    // If ads are disabled or no image, show a premium House Ad
    if (!isEnabled || !imageUrl) {
        return (
            <div className={`relative overflow-hidden ${ad.bg} rounded-xl shadow-lg w-full min-h-[200px] h-auto flex flex-col md:flex-row items-center justify-between p-8 md:p-12 group cursor-pointer hover:shadow-2xl transition-all duration-500 ${className}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>

                <div className="relative z-10 flex flex-col justify-center w-full md:w-auto text-center md:text-left mb-6 md:mb-0">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-3">Sponsored</span>
                    <h3 className="text-2xl md:text-4xl font-black text-white font-serif italic mb-2 w-full">{ad.title}</h3>
                    <p className="text-white/80 text-base font-medium w-full max-w-md">{ad.subtitle}</p>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-4 shrink-0">
                    <span className="text-5xl filter drop-shadow-lg">{ad.icon}</span>
                    <button className="px-8 py-3 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-100 transition-colors shadow-lg whitespace-nowrap">
                        {ad.cta}
                    </button>
                </div>
            </div>
        );
    }

    // Render image-based ad using AdBanner
    return (
        <div className={`${className}`}>
            <AdBanner
                imageUrl={imageUrl}
                linkUrl={linkUrl}
                enabled={isEnabled}
                className="rounded-xl overflow-hidden shadow-lg"
            />
        </div>
    );
};

export default AdSpace;
