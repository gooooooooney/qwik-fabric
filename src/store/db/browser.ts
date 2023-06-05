import Dexie from "dexie";
import type { StorageStrategy } from "./strategy";

// 定义Dexie数据库
class BrowserStore extends Dexie {
    canvasData: Dexie.Table<any, number>; // 表示存储Canvas数据的表

    constructor(databaseName = 'canvasTmp') {
        super(databaseName);
        this.version(1).stores({
            canvasData: '++id',
        });
        this.canvasData = this.table('canvasData');
    }
}



// IndexedDB策略
export class IndexedDBStrategy implements StorageStrategy {
    db: BrowserStore;

    constructor() {
        this.db = new BrowserStore();
    }

    save(data: any): void {
        this.db.canvasData.put(data, data.id).then(r => {
            console.log(r)
        });

    }

    remove(id: number): void {
        this.db.canvasData.delete(id);
    }
    async load(): Promise<any> {
        return this.db.canvasData.toArray();
    }
}