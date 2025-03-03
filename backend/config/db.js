import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

//  create a sql connection using our env variables 
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

//  this sql function we export is used as a tagged template literal, which allows us to write sql queries safely 


