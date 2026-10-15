import * as abstractions from "@razomy/abstractions";
import * as domains from "@razomy/domains";

export interface UserAuth extends domains.identitys.UserChild, abstractions.components.CrudDateTime {
  securitys: abstractions.patterns.IdRef<Security>[];
  providers: abstractions.patterns.IdRef<Provider>[];
  sessions: abstractions.patterns.IdRef<Session>[];
  recoveryCodes: abstractions.patterns.IdRef<RecoveryCode>[];
  authEvents: abstractions.patterns.IdRef<AuthEvent>[];
}

export interface UserAuthChild extends abstractions.patterns.HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userAuth: abstractions.patterns.IdRef<UserAuth>;
}

export interface Security extends UserAuthChild, abstractions.components.CrudDateTime {
  isBanned: boolean;
  banReason: string;
  failedLoginAttempts: abstractions.primitives.Int;
  lockedUntil: abstractions.components.DateTime | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  passwordChangedAt: abstractions.components.DateTime | null;
}

/**
 * @title Провайдеры (OAuth, Пароли) - Страницы auth/login, auth/callback
 * @unique provider, providerAccountId
 */
export interface Provider extends UserAuthChild, abstractions.components.CrudDateTime {
  provider: 'google' | 'apple' | 'credentials' | string;
  // ID из Google ИЛИ Email пользователя (для credentials)
  providerAccountId: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Credential {
  provider: abstractions.patterns.Primary<abstractions.patterns.IdRef<Provider>>;
  passwordHash?: string;
}

/**
 * @title Управление сессиями - Страница account/security/sessions
 */
export interface Session extends UserAuthChild, abstractions.components.CrudDateTime {
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
export interface RecoveryCode extends UserAuthChild, abstractions.components.CrudDateTime {
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
export interface VerificationToken extends UserAuthChild, abstractions.components.CrudDateTime {
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
  payload?: abstractions.patterns.Json;
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
export interface AuthEvent extends UserAuthChild, abstractions.components.CrudDateTime, abstractions.patterns.HasMetadata {
  action: AuthAction;
  /**
   * @index
   */
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
