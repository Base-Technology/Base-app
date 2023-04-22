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

export async function queryProfile() {
    const sqlite = SQLite.getInstance();
    const results = await sqlite.executeSql(`SELECT * FROM "profile" WHERE "private_key" IS NOT NULL`);
    return results.rows.length > 0 ? results.rows.item(0) : undefined;
}

export async function addProfile(id, private_key, address) {
    const sqlite = SQLite.getInstance();
    await sqlite.executeSql(`INSERT INTO "profile" VALUES (?, ?, ?)`, [id, private_key, address]);
}
