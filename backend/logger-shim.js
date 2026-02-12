
const originalConsoleError = console.error;
console.error = function (...args) {
    const fs = require('fs');
    fs.appendFileSync('server-error.log', new Date().toISOString() + ' ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') + '\n');
    originalConsoleError.apply(console, args);
};
