// region EventSourcing
export type ActionType = 'Create' | 'Read' | 'Update' | 'Delete';

export interface ConfigEvent {
  type: ActionType;
  path: string[];
  value: any | null;
}

export class EventSourcing {
  public events: ConfigEvent[] = [];

  pushAdd(path: string[], value: any) {
    this.events.push({
      path,
      value,
      type: 'Create'
    });
  }

  pushSet(path: string[], value: any) {
    this.events.push({
      path,
      value,
      type: 'Update'
    });
  }

  pushRemove(path: string[]) {
    this.events.push({
      path,
      value: null,
      type: 'Delete'
    });
  }

  pushGet(path: string[], value: any) {
    this.events.push({
      path,
      value: null,
      type: 'Read'
    });
  }
}

// endregion EventSourcing
