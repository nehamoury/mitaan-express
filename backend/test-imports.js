
try {
    const dotenv = require('dotenv');
    console.log('dotenv loaded');
} catch (e) { console.error('dotenv failed', e.message); }

try {
    const express = require('express');
    console.log('express loaded');
} catch (e) { console.error('express failed', e.message); }

try {
    const cors = require('cors');
    console.log('cors loaded');
} catch (e) { console.error('cors failed', e.message); }

try {
    const { PrismaClient } = require('@prisma/client');
    console.log('PrismaClient loaded');
} catch (e) { console.error('PrismaClient failed', e.message); }

try {
    const { PrismaPg } = require('@prisma/adapter-pg');
    console.log('PrismaPg loaded');
} catch (e) { console.error('PrismaPg failed', e.message); }

try {
    const { Pool } = require('pg');
    console.log('pg loaded');
} catch (e) { console.error('pg failed', e.message); }

console.log('All imports tested');
