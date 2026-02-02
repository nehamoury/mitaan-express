import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Search, Grid, List, Trash2, Check, Download, Copy } from 'lucide-react';
import { useAdminArticles } from '../../hooks/useQueries';

const MediaLibrary = () => {
    const [media, setMedia] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // TanStack Query Hook
    const { data: articles = [], isLoading: loading } = useAdminArticles();

    useEffect(() => {
        if (articles.length > 0) {
            const mediaItems = articles.filter(a => a.image).map(a => ({
                id: a.id,
                url: a.image,
                name: a.title.substring(0, 20) + '...',
                size: 'Unknown',
                date: new Date(a.createdAt)
            }));
            setMedia(mediaItems);
        } else if (!loading) {
            setMedia([
                { id: 1, url: 'https://picsum.photos/400/300?random=1', name: 'article-image-1.jpg', size: '245 KB', date: new Date() },
                { id: 2, url: 'https://picsum.photos/400/300?random=2', name: 'breaking-news.jpg', size: '189 KB', date: new Date() },
                { id: 3, url: 'https://picsum.photos/400/300?random=3', name: 'featured-story.jpg', size: '312 KB', date: new Date() },
            ]);
        }
    }, [articles, loading]);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    }, []);

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = async (files) => {
        setUploading(true);

        // Simulate upload - replace with actual upload logic
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newMedia = {
                    id: Date.now() + Math.random(),
                    url: e.target.result,
                    name: file.name,
                    size: `${(file.size / 1024).toFixed(0)} KB`,
                    date: new Date()
                };
                setMedia(prev => [newMedia, ...prev]);
            };
            reader.readAsDataURL(file);
        }

        setTimeout(() => {
            setUploading(false);
            alert(`${files.length} file(s) uploaded successfully!`);
        }, 1000);
    };

    const handlePaste = useCallback((e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    handleFiles([file]);
                }
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    const toggleSelection = (id) => {
        setSelectedMedia(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedMedia.length === filteredMedia.length) {
            setSelectedMedia([]);
        } else {
            setSelectedMedia(filteredMedia.map(m => m.id));
        }
    };

    const bulkDelete = () => {
        if (selectedMedia.length === 0) return;
        if (!window.confirm(`Delete ${selectedMedia.length} file(s)?`)) return;

        setMedia(prev => prev.filter(m => !selectedMedia.includes(m.id)));
        setSelectedMedia([]);
        alert('Files deleted!');
    };

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
    };

    const downloadImage = (url, name) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.click();
    };

    const filteredMedia = media.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: media.length,
        selected: selectedMedia.length,
        totalSize: media.reduce((acc, m) => acc + parseInt(m.size), 0)
    };

    return (
        <div className="p-4 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Media Library</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {stats.total} files • {stats.totalSize} KB total
                        {stats.selected > 0 && ` • ${stats.selected} selected`}
                    </p>
                </div>
                <label className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2 cursor-pointer">
                    <Upload size={18} />
                    Upload Files
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Upload Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragActive
                    ? 'border-red-600 bg-red-50 dark:bg-red-900/10'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50'
                    }`}
            >
                <Upload size={48} className={`mx-auto mb-4 ${dragActive ? 'text-red-600' : 'text-slate-400'}`} />
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {dragActive ? 'Drop files here!' : 'Drag & drop images here'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    or click "Upload Files" button • You can also paste images (Ctrl+V)
                </p>
                <p className="text-xs text-slate-400">
                    Supports: JPG, PNG, GIF, WebP • Max 5MB per file
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 ring-red-600 text-slate-900 dark:text-white"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-lg transition-all ${viewMode === 'grid'
                            ? 'bg-red-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                        title="Grid view"
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-lg transition-all ${viewMode === 'list'
                            ? 'bg-red-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                        title="List view"
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedMedia.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/20 p-4 rounded-xl flex items-center justify-between">
                    <span className="font-bold text-blue-900 dark:text-blue-400">
                        {selectedMedia.length} file(s) selected
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={bulkDelete}
                            className="px-3 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all text-sm flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                        <button
                            onClick={() => setSelectedMedia([])}
                            className="px-3 py-2 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition-all text-sm"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}

            {/* Media Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMedia.map(item => (
                        <div
                            key={item.id}
                            className={`group relative bg-white dark:bg-slate-800 rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg ${selectedMedia.includes(item.id)
                                ? 'border-red-600 ring-2 ring-red-600'
                                : 'border-slate-100 dark:border-white/5'
                                }`}
                        >
                            <div className="aspect-square relative">
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => copyUrl(item.url)}
                                        className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-all"
                                        title="Copy URL"
                                    >
                                        <Copy size={16} className="text-slate-900" />
                                    </button>
                                    <button
                                        onClick={() => downloadImage(item.url, item.name)}
                                        className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-all"
                                        title="Download"
                                    >
                                        <Download size={16} className="text-slate-900" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Delete this file?')) {
                                                setMedia(prev => prev.filter(m => m.id !== item.id));
                                            }
                                        }}
                                        className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} className="text-white" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => toggleSelection(item.id)}
                                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                                >
                                    {selectedMedia.includes(item.id) ? (
                                        <Check size={16} className="text-red-600" />
                                    ) : (
                                        <div className="w-4 h-4 border-2 border-slate-400 rounded" />
                                    )}
                                </button>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate" title={item.name}>
                                    {item.name}
                                </p>
                                <p className="text-xs text-slate-500">{item.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <button onClick={selectAll} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                                        {selectedMedia.length === filteredMedia.length && filteredMedia.length > 0 ? (
                                            <Check size={18} className="text-red-600" />
                                        ) : (
                                            <div className="w-4 h-4 border-2 border-slate-400 rounded" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Preview</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Size</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredMedia.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleSelection(item.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                                            {selectedMedia.includes(item.id) ? (
                                                <Check size={18} className="text-red-600" />
                                            ) : (
                                                <div className="w-4 h-4 border-2 border-slate-400 rounded" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <img src={item.url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.size}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{item.date.toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => copyUrl(item.url)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" title="Copy URL">
                                                <Copy size={16} />
                                            </button>
                                            <button onClick={() => downloadImage(item.url, item.name)} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg" title="Download">
                                                <Download size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Delete this file?')) {
                                                        setMedia(prev => prev.filter(m => m.id !== item.id));
                                                    }
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {uploading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4" />
                        <p className="font-bold text-slate-900 dark:text-white">Uploading files...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;
