import dotenv from 'dotenv'
import pg from 'pg';

dotenv.config();

class PostgresCon {
    client

    constructor(database){
        this.client = new pg.Client({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            database: database,
            port: process.env.POSTGRES_PORT
        })
    }
}

export default PostgresCon;