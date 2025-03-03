import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/ProductRoutes.js'
import { sql } from './config/db.js';
import { aj } from './lib/arcjet.js';



dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001

// helmet is a security middleware that helps you protect your app by setting various http headers will secure your app
app.use(helmet())
app.use(cors())
app.use(express.json())
// will log the requests
app.use(morgan('dev'));

//  apply arcjet rate limit for all routes

app.use(async (req, res) => {
    try {
        const decision = await aj.protect(req, {
            // requested: 1 specifies that each request consumes 1 token
        })
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: 'Too many requests, please try again later' });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ error: 'Forbidden, you are a bot' });
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
            return
        }
        next()

        // check for spoofed bots

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ error: 'Forbidden, you are a spoofed bot' });
            return
        }
    } catch (error) {
        console.log("Error in arcjet middleware", error);
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
})

app.use('/api/products', productsRoutes)


async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
`
        console.log("Database initialized successfully");

    } catch (error) {
        console.log("Error initDB", error);
    }
}

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })