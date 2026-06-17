// // ==========================================
// // СХЕМА АВТОРИЗАЦИИ (auths_db)
// // ==========================================
//
// // Настройки безопасности (2FA, пароль) - Страницы account/security/*
// model UserAuth {
//   securityId String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   userId     String @unique @db.Uuid
//
//
//   security      UserSecurity? // Вынесено в auths_db для безопасности
//   providers     Provider[]
//   sessions      Session[]
//   recoveryCodes RecoveryCode[]
//
//   // --- Блокировки и Бан (для страниц auth/locked и auth/banned) ---
//   isBanned            Boolean   @default(false)
//   banReason           String?
//   failedLoginAttempts Int       @default(0)
//   lockedUntil         DateTime?
//
//   // 2FA Настройки
//   twoFactorEnabled Boolean @default(false)
//   twoFactorSecret  String? // Зашифрованный TOTP ключ (Google Auth)
//
//   // Контроль смены пароля
//   passwordChangedAt DateTime?
//
//   user User @relation(fields: [userId], references: [userId], onDelete: Cascade)
//
//   @@schema("auths_db")
// }
//
// // Провайдеры (OAuth, Пароли) - Страницы auth/login, auth/callback
// model Provider {
//   providerId String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   userId     String @db.Uuid
//
//   provider          String // 'google', 'apple', 'credentials'
//   providerAccountId String // ID из Google ИЛИ Email пользователя (для credentials)
//
//   // Данные OAuth
//   email        String?
//   accessToken  String?
//   refreshToken String?
//
//   // Данные для входа по паролю (если provider == 'credentials')
//   passwordHash String?
//
//   createdAt DateTime  @default(now())
//   deletedAt DateTime?
//
//   user User @relation(fields: [userId], references: [userId], onDelete: Cascade)
//
//   @@unique([provider, providerAccountId])
//   @@schema("auths_db")
// }
//
// // Управление сессиями - Страница account/security/sessions
// model Session {
//   sessionId String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   userId    String @db.Uuid
//
//   sessionToken String @unique
//
//   // Инфа об устройстве (полезно для вывода в UI)
//   userAgent  String?
//   ipAddress  String? // Для страницы "Подтверждение нового устройства"
//   deviceType String? // 'mobile', 'desktop', 'tablet'
//   location   String? // Город/Страна, если резолвишь по IP
//
//   expiresAt DateTime
//   createdAt DateTime  @default(now())
//   deletedAt DateTime?
//
//   user User @relation(fields: [userId], references: [userId], onDelete: Cascade)
//
//   @@index([userId])
//   @@schema("auths_db")
// }
//
// // Резервные коды для 2FA - Страница auth/recovery-code
// model RecoveryCode {
//   id     String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   userId String @db.Uuid
//
//   codeHash String // Хеш кода, чтобы даже при сливе БД коды не утекли
//   isUsed   Boolean @default(false)
//
//   usedAt DateTime?
//
//   user User @relation(fields: [userId], references: [userId], onDelete: Cascade)
//
//   @@index([userId])
//   @@schema("auths_db")
// }
//
// // Токены верификации (Magic Links, Сброс пароля, Подтверждение Email)
// // Страницы: auth/magic-link, auth/forgot-password, auth/verify-email
// model VerificationToken {
//   id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   identifier String // Email или номер телефона
//   token      String    @unique // Случайный хеш
//   type       TokenType // Тип токена
//
//   // Дополнительные данные (Например: {"newEmail": "new@mail.com"} при смене почты)
//   payload Json?
//
//   expiresAt DateTime
//   createdAt DateTime @default(now())
//
//   @@index([identifier])
//   @@schema("auths_db")
// }
//
// enum TokenType {
//   EMAIL_VERIFICATION
//   PASSWORD_RESET
//   MAGIC_LINK
//   DEVICE_VERIFICATION
//   CHANGE_EMAIL
//
//   @@schema("auths_db")
// }
//
// // Аудит событий - логируем подозрительную активность и входы
// // Используется для аналитики и защиты от брутфорса
// model AuthEvent {
//   eventId String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   userId  String? @db.Uuid // Nullable, так как при неверном пароле юзер может быть не найден
//
//   action    AuthAction // Что произошло
//   ipAddress String?
//   userAgent String?
//
//   // Детали (Например: {"reason": "invalid_password"})
//   metadata Json?
//
//   createdAt DateTime @default(now())
//
//   user User? @relation(fields: [userId], references: [userId], onDelete: Cascade)
//
//   @@index([userId])
//   @@index([ipAddress])
//   @@schema("auths_db")
// }
//
// enum AuthAction {
//   LOGIN_SUCCESS
//   LOGIN_FAILED
//   LOGOUT
//   PASSWORD_RESET_REQUESTED
//   PASSWORD_CHANGED
//   TWO_FACTOR_ENABLED
//   TWO_FACTOR_DISABLED
//   ACCOUNT_LOCKED
//   NEW_DEVICE_DETECTED
//
//   @@schema("auths_db")
// }
//
//
// // ==========================================
// // AUTHS DB
// // ==========================================
//
// export enum TokenType {
//   EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
//   PASSWORD_RESET = 'PASSWORD_RESET',
//   MAGIC_LINK = 'MAGIC_LINK',
//   DEVICE_VERIFICATION = 'DEVICE_VERIFICATION',
//   CHANGE_EMAIL = 'CHANGE_EMAIL',
// }
//
// export enum AuthAction {
//   LOGIN_SUCCESS = 'LOGIN_SUCCESS',
//   LOGIN_FAILED = 'LOGIN_FAILED',
//   LOGOUT = 'LOGOUT',
//   PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
//   PASSWORD_CHANGED = 'PASSWORD_CHANGED',
//   TWO_FACTOR_ENABLED = 'TWO_FACTOR_ENABLED',
//   TWO_FACTOR_DISABLED = 'TWO_FACTOR_DISABLED',
//   ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
//   NEW_DEVICE_DETECTED = 'NEW_DEVICE_DETECTED',
// }
//
// export interface UserAuth {
//   securityId: string;
//   userId: string;
//   isBanned: boolean;
//   banReason?: string;
//   failedLoginAttempts: number;
//   lockedUntil?: Date;
//   twoFactorEnabled: boolean;
//   twoFactorSecret?: string;
//   passwordChangedAt?: Date;
// }
//
// export const UserAuthSchema: ModelMetadata = {
//   schema: 'auths_db',
//   uniqueConstraints: {
//     userId_unique: ['userId'],
//   },
//   indexes: {},
// };
//
// export interface Provider {
//   providerId: string;
//   userId: string;
//   provider: string;
//   providerAccountId: string;
//   email?: string;
//   accessToken?: string;
//   refreshToken?: string;
//   passwordHash?: string;
//   createdAt: Date;
//   deletedAt?: Date;
// }
//
// export const ProviderSchema: ModelMetadata = {
//   schema: 'auths_db',
//   uniqueConstraints: {
//     provider_account_unique: ['provider', 'providerAccountId'],
//   },
//   indexes: {},
// };
//
// export interface Session {
//   sessionId: string;
//   userId: string;
//   sessionToken: string;
//   userAgent?: string;
//   ipAddress?: string;
//   deviceType?: 'mobile' | 'desktop' | 'tablet';
//   location?: string;
//   expiresAt: Date;
//   createdAt: Date;
//   deletedAt?: Date;
// }
//
// export const SessionSchema: ModelMetadata = {
//   schema: 'auths_db',
//   uniqueConstraints: {
//     token_unique: ['sessionToken'],
//   },
//   indexes: {
//     userId_index: {fields: ['userId']},
//   },
// };
//
// export interface RecoveryCode {
//   id: string;
//   userId: string;
//   codeHash: string;
//   isUsed: boolean;
//   usedAt?: Date;
// }
//
// export const RecoveryCodeSchema: ModelMetadata = {
//   schema: 'auths_db',
//   uniqueConstraints: {},
//   indexes: {
//     userId_index: {fields: ['userId']},
//   },
// };
//
// export interface VerificationToken {
//   id: string;
//   identifier: string;
//   token: string;
//   type: TokenType;
//   payload?: any;
//   expiresAt: Date;
//   createdAt: Date;
// }
//
// export const VerificationTokenSchema: ModelMetadata = {
//   schema: 'auths_db',
//   uniqueConstraints: {
//     token_unique: ['token'],
//   },
//   indexes: {
//     identifier_index: {fields: ['identifier']},
//   },
// };
//
// export interface AuthEvent {
//   eventId: string;
//   userId?: string;
//   action: AuthAction;
//   ipAddress?: string;
//   userAgent?: string;
//   metadata?: any;
//   createdAt: Date;
// }
//
// export const AuthEventSchema: ModelMetadata = {
//   schema: 'auths_db',
//   uniqueConstraints: {},
//   indexes: {
//     userId_index: {fields: ['userId']},
//     ip_index: {fields: ['ipAddress']},
//   },
// };
