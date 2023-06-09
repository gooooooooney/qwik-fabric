// 存储策略接口
export interface StorageStrategy {
    save(data: any): Promise<boolean>;
    // get(id: number): any;
    remove(id: number): Promise<any>;
    load(): Promise<any>;
  }