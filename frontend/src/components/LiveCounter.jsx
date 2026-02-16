import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling'],
    withCredentials: true,
    reconnectionExperiments: true
});

const LiveCounter = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        socket.on('activeUsers', (data) => {
            setCount(data);
        });

        return () => {
            socket.off('activeUsers');
        };
    }, []);

    return (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
            <span className="relative flex h-2 w-2">
                <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
                ></motion.span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">
                {count} Live
            </span>
        </div>
    );
};

export default LiveCounter;
