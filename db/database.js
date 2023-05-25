import { config } from '../config.js';
import { createPool } from 'mariadb';


const pool = createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    port:'30088',
    timezone: "+09:00"
});

//export const db = pool.promise();
await pool.query('wrong query');

