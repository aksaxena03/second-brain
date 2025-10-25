import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  db_url: process.env.DB_URL || process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  jwt_secret: process.env.JWT_SECRET || 'your-secret-key',
  node_env: process.env.NODE_ENV || 'development'
};

export default config;
