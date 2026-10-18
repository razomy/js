export type IoEnvironment = 'browser_js' | 'server_js';

export enum CpuArchitecture {
  X86_64 = 'x64',      // Современные ПК (Intel/AMD)
  X86 = 'x86',         // Старые 32-битные ПК
  ARM64 = 'arm64',     // Apple M1/M2/M3, современные смартфоны, ARM-серверы
  ARM32 = 'arm',       // Старые смартфоны, Raspberry Pi (старые версии)
  RISCV = 'riscv64',   // Новая открытая архитектура
  MIPS = 'mips',       // Роутеры и спец. оборудование
  WASM = 'wasm32'      // WebAssembly (виртуальная архитектура для браузера)
}

export enum OperatingSystem {
  Windows = 'win32',    // Windows
  MacOS = 'darwin',     // macOS (Apple)
  Linux = 'linux',      // Linux
  Android = 'android',  // Android
  IOS = 'ios',          // iOS (iPhone)
  FreeBSD = 'freebsd',  // Специфичные серверные ОС
  BareMetal = 'none'    // Встраиваемые системы (без ОС, микроконтроллеры)
}

export enum BuildTarget {
  // Windows
  WindowsX64 = 'win32-x64',
  WindowsArm64 = 'win32-arm64',

  // macOS
  MacOsX64 = 'darwin-x64',      // Для старых Mac на Intel
  MacOsArm64 = 'darwin-arm64',  // Для новых Mac на Apple Silicon
  MacOsUniversal = 'darwin-universal', // Склейка x64 + arm64 в один файл

  // Linux
  LinuxX64 = 'linux-x64',
  LinuxArm64 = 'linux-arm64',

  // Mobile
  AndroidArm64 = 'android-arm64',
  IosArm64 = 'ios-arm64',

  // Web
  WebAssembly = 'wasm32-unknown-unknown' // Стандартное имя таргета для браузера
}

export enum PackageFormat {
  // Windows
  EXE = '.exe',
  MSI = '.msi',

  // macOS
  DMG = '.dmg',
  PKG = '.pkg',
  APP = '.app',

  // Linux
  DEB = '.deb',       // Для Ubuntu/Debian
  RPM = '.rpm',       // Для Fedora/RedHat
  APPIMAGE = '.AppImage', // Универсальный формат Linux

  // Mobile
  APK = '.apk',       // Android App
  AAB = '.aab',       // Android App Bundle (для Google Play)
  IPA = '.ipa'        // iOS App
}

export interface BuildConfig {
  os: OperatingSystem;
  arch: CpuArchitecture;
  format: PackageFormat;
}

