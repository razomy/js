import * as abstracts from "@razomy/abstracts";
import * as domains from "@razomy/domains";

export interface UserAuth extends domains.identitys.UserChild, abstracts.domains.CudDateTime {
  securitys: abstracts.patterns.IdRef<Security>[];
  providers: abstracts.patterns.IdRef<Provider>[];
  sessions: abstracts.patterns.IdRef<Session>[];
  recoveryCodes: abstracts.patterns.IdRef<RecoveryCode>[];
  authEvents: abstracts.patterns.IdRef<AuthEvent>[];
}

export interface UserAuthChild extends abstracts.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userAuth: abstracts.patterns.IdRef<UserAuth>;
}

export interface Security extends UserAuthChild, abstracts.domains.CudDateTime {
  isBanned: boolean;
  banReason: string;
  failedLoginAttempts: abstracts.primitives.Int;
  lockedUntil: abstracts.domains.DateTime | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  passwordChangedAt: abstracts.domains.DateTime | null;
}

/**
 * @title Провайдеры (OAuth, Пароли) - Страницы auth/login, auth/callback
 * @unique provider, providerAccountId
 */
export interface Provider extends UserAuthChild, abstracts.domains.CudDateTime {
  provider: 'google' | 'apple' | 'credentials' | string;
  // ID из Google ИЛИ Email пользователя (для credentials)
  providerAccountId: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Credential {
  provider: abstracts.patterns.Primary<abstracts.patterns.IdRef<Provider>>;
  passwordHash?: string;
}

/**
 * @title Управление сессиями - Страница account/security/sessions
 */
export interface Session extends UserAuthChild, abstracts.domains.CudDateTime {
  /**
   * @uniq
   */
  sessionToken: string;
  // Инфа об устройстве (полезно для вывода в UI)
  userAgent?: string;
  ipAddress?: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  location?: string;
  expiresAt: Date;
}

/**
 * @title Резервные коды для 2FA - Страница auth/recovery-code
 */
export interface RecoveryCode extends UserAuthChild, abstracts.domains.CudDateTime {
  // Хеш кода, чтобы даже при сливе БД коды не утекли
  codeHash: string;
  isUsed: boolean;
  usedAt?: Date;
}

export enum TokenType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  MAGIC_LINK = 'MAGIC_LINK',
  DEVICE_VERIFICATION = 'DEVICE_VERIFICATION',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
}

/*
   Токены верификации (Magic Links, Сброс пароля, Подтверждение Email)
   Страницы: auth/magic-link, auth/forgot-password, auth/verify-email
 */
export interface VerificationToken extends UserAuthChild, abstracts.domains.CudDateTime {
  /**
   * @title Email или номер телефона
   * @index
   */
  identifier: string;
  /**
   * @uniq
   */
  token: string;
  type: TokenType;
  payload?: abstracts.patterns.Json;
  expiresAt: Date;
}

export enum AuthAction {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  TWO_FACTOR_ENABLED = 'TWO_FACTOR_ENABLED',
  TWO_FACTOR_DISABLED = 'TWO_FACTOR_DISABLED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  NEW_DEVICE_DETECTED = 'NEW_DEVICE_DETECTED',
}

/**
 * Аудит событий - логируем подозрительную активность и входы
 * Используется для аналитики и защиты от брутфорса
 */
export interface AuthEvent extends UserAuthChild, abstracts.domains.CudDateTime, abstracts.patterns.HasMetadata {
  action: AuthAction;
  /**
   * @index
   */
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
