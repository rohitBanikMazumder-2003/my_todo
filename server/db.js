import pg from 'pg';

const pool=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"world",
    password:"ROHIT@2003",
    port:5432
});

export default pool;
