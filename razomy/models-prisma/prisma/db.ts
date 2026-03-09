// src/index.ts
import { PrismaClient } from './generated/client';

// Экспортируем инстанс, чтобы не создавать его каждый раз в проектах
export const prisma = new PrismaClient({ connectionString: process.env.DATABASE_URL });

// Реэкспортируем всё (типы моделей: User, Post и т.д.)
export * from './generated/client';
