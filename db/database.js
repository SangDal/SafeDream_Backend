import { config } from '../config.js';
import * as mysql from 'mariadb';

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    port:'30088',
    timezone: "+09:00"
});

export const db = pool.promise();


