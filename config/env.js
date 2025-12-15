import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV !== 'production') {
  const envFile = '.env.development';
  const envPath = path.resolve(__dirname, '..', envFile);

  console.log(`📁 Loading: ${envFile}`);

  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.error('❌ Error loading env file:', result.error.message);
    process.exit(1);
  }

  console.log('✅ Environment loaded from file\n');
} else {
  console.log('✅ Using production environment variables from platform\n');
}


export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
};