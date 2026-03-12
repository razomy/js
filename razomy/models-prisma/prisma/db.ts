// // src/index.ts
// import { PrismaClient } from './generated/client';
// import { PrismaPg } from '@prisma/adapter-pg';
//
// // Экспортируем инстанс, чтобы не создавать его каждый раз в проектах
// export const prisma = new PrismaClient({
//   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
// });
//
// // Реэкспортируем всё (типы моделей: User, Post и т.д.)
// export * from './generated/client';
