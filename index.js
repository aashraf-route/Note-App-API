// FIRST: Load environment variables
import './config/env.js';
import { bootstrap } from "./src/app.bootstrap.js";
import express from "express";

console.log('=== LOADED ENVIRONMENT ===');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('========================\n');

const app = express();
bootstrap(express, app);
