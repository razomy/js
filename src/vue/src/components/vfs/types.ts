export interface VfsItem {
  id: string;
  name: string;
  isFolder: boolean;
  parentId: string | null;
  size?: number;
  type?: string;
  meta?: Record<string, any>;
}

export interface VfsQuery {
  parentId: string | null;
  search?: string;
  page: number;
  limit: number;
}

export interface IVfsController {
  fetchItems(query: VfsQuery): Promise<{ items: VfsItem[]; total: number }>;
}
