import SQLite from './sqlite';

export const defaultID = "0x1";

export async function queryProfileByID(id, callback) {
    if (!id) {
        id = defaultID;
    }
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "profile" WHERE "id" = ?`, [id]);
    return results.rows.item(0);
}
