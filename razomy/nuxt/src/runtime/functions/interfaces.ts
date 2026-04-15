export type TranslateKey = string;

export interface NAryTreeNode {
  id: string;
  children: NAryTreeNode[];
}

export interface NavigationNodeMeta {
  url: string;
  // Short uniq(locally) human indicator
  nameTk: TranslateKey;
  // short exampled name
  // titleTk: TranslateKey,
  // full exampled name
  // descriptionTk: TranslateKey,
  iconName: string;
}

export interface NavigationNode extends NAryTreeNode {
  id: string;
  children: NavigationNode[];
  meta: NavigationNodeMeta;
}

export interface RzmNuxtStaticTranslate {
  nuxt: {
    product: {
      name: string;
      description: string;
    };
  };
}

export interface RzmNuxtRuntimeTranslate {
  nuxt: {
    footer: {
      donate: string;
      start_year: string;
      company_name: string;
    };
    dropzone: {
      converting: string;
      scanning_folders: string;
      drop_title: string;
      support_nested_folders: string;
      select_files: string;
      select_folder: string;
      selected_files: string;
      total_size: string;
      clear_all: string;
      add_files: string;
      convert: string;
    };
    error: {
      404: {
        title: string;
        back_btn: string;
      };
    };
  };
}

export interface RzmNuxtStaticConfig {
  url: string;
  i18n: {
    en: RzmNuxtStaticTranslate;
  };
  cookie: {
    session: {
      locale: string;
    };
  };
}

export interface RzmNuxtRuntimeConfig {
  i18n: {
    en: RzmNuxtRuntimeTranslate;
  };
  navigationRoot: NavigationNode;
  externalNavigationRoot: NavigationNode;
  footerNavigationNodes: NavigationNode[];
  headerNavigationNodes: NavigationNode[];
}

// 1. Utility type that generates ALL paths (leafs and nodes)
export type PathGenerator<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | `${K}.${PathGenerator<T[K]>}` // Recurse into nested objects
        : `${K}`; // Stop at primitives
    }[keyof T & (string | number)]
  : never;

// 2. Utility type that generates ONLY absolute end/leaf paths
export type LeafPathGenerator<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${LeafPathGenerator<T[K]>}` // Recurse without keeping the parent key
        : `${K}`; // Stop at primitives
    }[keyof T & (string | number)]
  : never;
