import Dexie from "dexie";

class DataBase extends Dexie {
    constructor(dbName = "canvas") {
        super(dbName)
        this.version(1).stores({
            canvas: "++id,canvas"
        })
    }
}