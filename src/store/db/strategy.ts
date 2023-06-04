// 存储策略接口
export interface StorageStrategy {
    save(data: any): any;
    // get(id: number): any;
    remove(id: number): void;
    load(): Promise<any>;
  }