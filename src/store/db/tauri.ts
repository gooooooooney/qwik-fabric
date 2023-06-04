// import { invoke } from "@tauri-apps/api";
// import { StorageStrategy } from "./strategy";

// // Tauri文件系统策略
// class FileSystemStrategy implements StorageStrategy {
//     save(data: any): void {
//         invoke('saveData', data); // 假设您在Tauri中定义了一个saveData的Tauri API函数来保存数据
//     }

//     async load(): Promise<any> {
//         return invoke('loadData'); // 假设您在Tauri中定义了一个loadData的Tauri API函数来加载数据
//     }

//     remove(id: number): void {
//         invoke('removeData', id); // 假设您在Tauri中定义了一个removeData的Tauri API函数来删除数据
//     }
// }