const { Pool } = require('pg');

// Direct connection (no -pooler)
const oldUrl = "postgresql://neondb_owner:npg_ZKbWEgzq9Y5o@ep-purple-sky-ah0hff27.us-east-1.aws.neon.tech/mithaan-exprees?sslmode=require";
const pool = new Pool({ connectionString: oldUrl });

(async () => {
    try {
        console.log("Connecting to DIRECT Neon DB...");
        const client = await pool.connect();
        console.log("Connection successful!");
        const res = await client.query('SELECT * FROM "Article" LIMIT 1');
        console.log("Found article:", res.rows[0]?.title);
        client.release();
    } catch (err) {
        console.error("Direct Connection Failed:", err.message);
    } finally {
        await pool.end();
    }
})();
