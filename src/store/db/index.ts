import { IndexedDBStrategy } from './browser';
import type { StorageStrategy } from './strategy';
import type { TemplateCanvas } from '../template';





// 环境类
class Environment {

    constructor(private storageStrategy: StorageStrategy) {

    }
    setStorageStrategy(strategy: StorageStrategy): void {
        this.storageStrategy = strategy;
    }

    saveCanvas(data: any): void {
        console.log(data)
        this.storageStrategy.save(data);
    }

    removeCanvas(id: number): void {
        this.storageStrategy.remove(id);
    }

    async loadCanvas(): Promise<TemplateCanvas[]> {
        return await this.storageStrategy.load();
    }
}

// 示例用法
export const environment = new Environment(new IndexedDBStrategy());
// const canvas = new fabric.Canvas('canvas');

// 在浏览器环境中使用IndexedDB策略
// environment.setStorageStrategy(new IndexedDBStrategy());
// environment.saveCanvas(canvas);

// // 在文件系统中使用Tauri策略
// environment.setStorageStrategy(new FileSystemStrategy());
// environment.saveCanvas(canvas);

// environment.loadCanvas().then((loadedCanvases) => {
//   // 在这里使用加载的Canvas对象
// });
