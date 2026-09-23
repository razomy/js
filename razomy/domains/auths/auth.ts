import type { Int } from '@razomy/abstracts/primitives';
import type { CudDateTime, DateTime, IdRef, Primary } from '@razomy/abstracts/domains';
import type { UserChild } from '../identitys/user';
import type { HasMetadata, Json } from '../../abstracts/domains/serializable';
import type { HasPrimaryId } from '../../abstracts/domains/has_id';

export interface UserAuth extends UserChild, CudDateTime {
  securitys: IdRef<Security>[];
  providers: IdRef<Provider>[];
  sessions: IdRef<Session>[];
  recoveryCodes: IdRef<RecoveryCode>[];
  authEvents: IdRef<AuthEvent>[];
}

export interface UserAuthChild extends HasPrimaryId {
  /**
   * @uniq
   * @onDeleteCascade
   */
  userAuth: IdRef<UserAuth>;
}

export interface Security extends UserAuthChild, CudDateTime {
  isBanned: boolean;
  banReason: string;
  failedLoginAttempts: Int;
  lockedUntil: DateTime | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  passwordChangedAt: DateTime | null;
}

/**
 * @title Провайдеры (OAuth, Пароли) - Страницы auth/login, auth/callback
 * @unique provider, providerAccountId
 */
export interface Provider extends UserAuthChild, CudDateTime {
  provider: 'google' | 'apple' | 'credentials' | string;
  // ID из Google ИЛИ Email пользователя (для credentials)
  providerAccountId: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Credential {
  provider: Primary<IdRef<Provider>>;
  passwordHash?: string;
}

/**
 * @title Управление сессиями - Страница account/security/sessions
 */
export interface Session extends UserAuthChild, CudDateTime {
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
export interface RecoveryCode extends UserAuthChild, CudDateTime {
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
export interface VerificationToken extends UserAuthChild, CudDateTime {
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
  payload?: Json;
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
export interface AuthEvent extends UserAuthChild, CudDateTime, HasMetadata {
  action: AuthAction;
  /**
   * @index
   */
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
