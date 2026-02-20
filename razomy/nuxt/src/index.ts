// TODO:move to menu category pakacge
export interface Category {
  key: string; // The translation key (e.g., 'nav.dashboard')
  categories: Category[]
  labelText: string; // The translation key (e.g., 'nav.dashboard')
  iconName: string;     // The MDI icon class
  url: string;      // The destination path
}
