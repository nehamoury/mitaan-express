const { Pool } = require('pg');

const oldUrl = "postgresql://neondb_owner:npg_ZKbWEgzq9Y5o@ep-purple-sky-ah0hff27-pooler.c-3.us-east-1.aws.neon.tech/mithaan-exprees?sslmode=require&channel_binding=require";
const pool = new Pool({ connectionString: oldUrl });

(async () => {
    try {
        console.log("Connecting to old Neon DB...");
        const client = await pool.connect();
        console.log("Connection successful! Attempting to fetch tables...");

        const tables = ['User', 'Category', 'Tag', 'Article', 'Blog', 'Media', 'Advertisement', 'Analytics', 'ActivityLog', 'Setting', 'Donation', 'Contact'];
        const data = {};

        for (const table of tables) {
            try {
                const res = await client.query(`SELECT * FROM "${table}"`);
                data[table] = res.rows;
                console.log(`Fetched ${res.rows.length} rows from ${table}`);
            } catch (e) {
                console.warn(`Could not fetch from ${table}:`, e.message);
            }
        }

        const fs = require('fs');
        fs.writeFileSync('neon_data_backup.json', JSON.stringify(data, null, 2));
        console.log("\n✅ Backup saved to neon_data_backup.json");
        client.release();
    } catch (err) {
        console.error("\n❌ Neon Connection Failed:", err.message);
        console.error("This usually means the Neon project is fully suspended.");
    } finally {
        await pool.end();
    }
})();
