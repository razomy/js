import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "../generated/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({connectionString});
export const prisma = new PrismaClient({adapter});

export const getPrismaWithUser = (userId?: string | null) => {
  return prisma.$extends({
    query: {
      $allModels: {
        // Перехватываем абсолютно все операции к моделям (findMany, update, create и тд)
        async $allOperations({args, query}) {

          // Если userId не передан (например, анонимный запрос),
          // просто выполняем запрос (RLS заблокирует данные, кроме тех, что доступны всем)
          if (!userId) {
            return prisma.$transaction(async (tx) => {
              // Сбрасываем контекст на всякий случай, чтобы из пула не прилетел чужой ID
              await tx.$executeRaw`SELECT set_config('app.current_user_id', '', true)`;
              return query(args);
            });
          }

          // Если пользователь есть, запускаем транзакцию
          return prisma.$transaction(async (tx) => {
            // 1. Устанавливаем ID пользователя в рамках текущей транзакции (соединения)
            await tx.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, true)`;

            // 2. Выполняем сам запрос (он пройдет через RLS с правильным user_id)
            return query(args);
          });
        },
      },
    },
  });
};

