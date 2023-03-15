import SQLite from './sqlite';

const defaultID = "0x111";

export async function queryPrivateKeyByProfileID(id, callback) {
    if (!id) {
        id = defaultID;
    }
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "profile" WHERE "id" = ?`, [id]);
    return results.rows.item(0);
}
